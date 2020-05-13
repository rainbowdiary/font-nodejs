db.account.find({name:"damu",age:19})

db.account.find({name:{$eq:"damu"},age:{$gt:10,$lt:20}})

db.account.find({
    name:{$not:{$eq:"damu"}}
})


db.account.find({
    $and:[
        {name:{$eq:"damu"}},
        {age:18}
    ]
})

db.account.find({
    $or:[
        {age:8},
        {name:"damu"}
    ]
}) 

db.account.find({
    $nor:[
        {age:8},
        {name:"damu"}
    ]
}) 


db.account.find({
    contact:{$elemMatch:{
        $in:["15851802713","15851802714"],
        $type:"string"
        // $eq:"china",
        // $in:["sh","china"]
    }}
})

db.account.find({
    name:{$regex:/c/}
})

db.account.find()

let data = db.account.find();
while(data.hasNext()){
    print(data.next())
}

let data2 = db.account.find();
data2.forEach((doc)=>{
    print(doc)
})

let data3 = db.account.find();
data3.limit(1)

let data4 = db.account.find();
data4.skip(11)

let data5 = db.account.find();
print(data5.limit(5).count(true))


let data6 = db.account.find();
data6.sort({name:1}).forEach((doc)=>{
    print(doc)
})



//skip 永远要比limit先执行
//sort 永远要比skip先执行
db.account.find({},{_id:0,contact:{$slice:[2,1]}}).sort({name:1}).skip(2).limit(5)

db.account.find({},{contact:{$elemMatch:{$type:"string"}}})













