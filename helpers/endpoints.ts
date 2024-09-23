import {env} from "~/helpers/env";

export const endpoints={
    user:{
        list:env.ENDPOINT+'user/list',
        login:env.ENDPOINT+'user/login',
        logout:env.ENDPOINT+'user/logout',
        create:env.ENDPOINT+'user/create',
        update:env.ENDPOINT+'user/update',
    },
    friend:{
        respond:env.ENDPOINT+'friend/request/respond',
        index:{
            new:env.ENDPOINT+'friend/index/new',
            my:env.ENDPOINT+'friend/index/my',
            pending:env.ENDPOINT+'friend/index/pending',
            requests:env.ENDPOINT+'friend/index/requests',
        },
        create:env.ENDPOINT+'friend/create',
        update:env.ENDPOINT+'friend/update',
        delete:env.ENDPOINT+'friend/delete',
        unfriend:env.ENDPOINT+'friend/unfriend',
    },
    veganlog:{
        create:env.ENDPOINT+'veganpost/create',
        index:env.ENDPOINT+'veganpost/index',
        update:env.ENDPOINT+'veganpost/update',
    },
    fcm:{
        send:env.ENDPOINT+'fb/send',
    },
    blog:{
        category:{
            create:env.ENDPOINT+'blog/category/create',
            index:env.ENDPOINT+'blog/category/index',
            delete:env.ENDPOINT+'blog/category/delete',
        },
        create:env.ENDPOINT+'blog/create',
        index:env.ENDPOINT+'blog/index',
        update:env.ENDPOINT+'blog/update',
    },
    recipe:{
        category:{
            create:env.ENDPOINT+'recipe/category/create',
            index:env.ENDPOINT+'recipe/category/index',
            delete:env.ENDPOINT+'recipe/category/delete',
        },
        create:env.ENDPOINT+'recipe/create',
        index:env.ENDPOINT+'recipe/index',
        update:env.ENDPOINT+'recipe/update',
    },
    news:{
        category:{
            create:env.ENDPOINT+'news/category/create',
            index:env.ENDPOINT+'news/category/index',
            delete:env.ENDPOINT+'news/category/delete',
        },
        create:env.ENDPOINT+'news/create',
        index:env.ENDPOINT+'news/index',
        update:env.ENDPOINT+'news/update',
    },
    event:{
        category:{
            create:env.ENDPOINT+'event/category/create',
            index:env.ENDPOINT+'event/category/index',
            delete:env.ENDPOINT+'event/category/delete',
        },
        create:env.ENDPOINT+'event/create',
        index:env.ENDPOINT+'event/index',
        update:env.ENDPOINT+'event/update',
    },
    like:{
        toggle:env.ENDPOINT+'like/toggle',
    },
    comment:{
        create:env.ENDPOINT+'comment/create',
        index:env.ENDPOINT+'comment/index',
    },
    socket: {
        index:env.BASEPOINT,
        // index:"http://localhost:3005/",
    },
    chat:{
        create:env.ENDPOINT+'chat/create',
        index:env.ENDPOINT+'chat/index',
    },
    restaurant:{
        category:{
            create:env.ENDPOINT+'restaurant/category/create',
            index:env.ENDPOINT+'restaurant/category/index',
            delete:env.ENDPOINT+'restaurant/category/delete',
        },
        create:env.ENDPOINT+'restaurant/create',
        index:env.ENDPOINT+'restaurant/index',
        update:env.ENDPOINT+'restaurant/update',
        delete:env.ENDPOINT+'restaurant/delete',
    },
    group:{
        create:env.ENDPOINT+'group/create',
        index:env.ENDPOINT+'group/index',
        my:env.ENDPOINT+'group/my',
        member:{
            create:env.ENDPOINT+'group/member/create',
            index:env.ENDPOINT+'group/member/index',
        }
    },
    notification:{
        create:env.ENDPOINT+'notification/create',
        index:env.ENDPOINT+'notification/index',
        delete:env.ENDPOINT+'notification/delete',
    },
}