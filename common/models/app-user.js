'use strict';

module.exports = function(Appuser) {
    Appuser.afterRemote('login', async (ctx, user, next) => {
        if(user){
            console.log("hit")
            user.token = user.id;
        
            let userData = await Appuser.find({
                    fields:{password: false, username: false, realm: false, '_id': 0},
                    include:{
                        relation: 'movies',
                        scope: {
                            fields: ['title', 'score']
                        },
                    },
                    where: {
                    id: user.userId
                }
            })
            console.log()
            user.userData = userData[0]
        }
    })
};
