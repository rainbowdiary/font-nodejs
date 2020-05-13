/*
    db.collection.find(query, projection)
        query : 读取文档时的筛选条件
        projection : 读取文档时的投影
        
    query条件中可以跟相应的操作符
        比较操作符
            { <field1>: { <operator1>: <value1> }, ... }
            $eq	 匹配字段值相等的文档
            $ne	 匹配字段值不相等的文档
                    $ne会筛选出不包含查询字段的文档
            $gt	 匹配字段值大于查询值的文档
            $gte 匹配字段值大于或等于查询值的文档
            $lt	 匹配字段值小于查询值的文档
            $lte 匹配字段值小于或等于查询值的文档
            $in	 匹配字段值在一个给定的数组内的文档
            $nin 匹配字段值不在一个给定的数组内的文档
        字段操作符
            $exists	匹配包含查询字段的文档
                { field: { $exists: <boolean> } }
            $type	匹配字段类型符合查询值的文档
                { field: { $type: <BSON type> } }    
        逻辑操作符
            (expression = key : operator-expression)
                $not	匹配筛选条件不成立的文档
                    { field: { $not: { <operator-expression> } } }
                $and	匹配多个筛选条件全部成立的文档
                    { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
                    当筛选条件不在同一个字段上时简写形式: { <expression1> ,  <expression2> }
                    当筛选条件在同一个字段上时简写形式: { key : {<operator-expression> , <operator-expression>} }
                $or	    匹配至少一个筛选条件成立的文档
                    { $or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }
                $nor	匹配多个筛选条件全部不成立的文档
                    { $nor: [ { <expression1> }, { <expression2> }, ...  { <expressionN> } ] }
        数组            
        
                
*/
db.users.find()

db.users.insert([{name:"damu",age:18,wife:"周冬雨",son:{name:"王思聪",age:33}}])
db.users.insert([{name:"damu",age:18,wife:"周冬雨",son:{name:"王思2聪",age:33}}])

db.users.find({
    name:"damu",
    wife:"周冬雨",
    "son.name":"王思聪"
})

db.users.find({name:{$not:{$ne:"周冬雨"}}})
db.users.find({$and:[{name:{$ne:"周冬雨"}},{name:{$eq:"damu"}}]})

