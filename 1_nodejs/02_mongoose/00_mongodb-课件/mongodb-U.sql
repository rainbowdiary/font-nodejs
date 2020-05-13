db.account.update(
    {name:"pcy"},
    {
        $inc:{
            newBalance2:1
        }
    }
)



db.account.update(
    {name:"pcy"},
    {
        $mul:{
            balance:.5
        }
    }
)



db.account.update(
    {name:"pcy"},
    {
        $inc:{
            balance:1
        }
    }
)



// brank:unset
// info.brank:unset
// info.brank : set
db.account.update(
    {name:"pcy"},
    {
        $rename:{
            "info.brank":"brank"
        }
    }
)


db.account.update(
    {name:"pcy"},
    {
        $set:{
            brank:"渣打银行"
        }
    }
)



db.account.update(
    {balance:"pcy"},
    {$rename:{
        "balance":"name"
    }}
)


db.account.update(
    {name:"pcy"},
    {$unset:{
        age:"12312312"
    }}
)





db.account.update(
    {name:"pcy"},
    {$set:{
        balance:-16800,
        info:{
            brank:"香港渣打银行"
        }
    }}
)