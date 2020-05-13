/*聚合管道
    聚合管道可以理解为流水线的一整个工作阶段.这些工作阶段之间的合作是一环扣一环的.
    时序较早的工作阶段,它的工作成果会影响下一个工作阶段的工作结果,
    即下个阶段依赖于上一个阶段的输出，上一个阶段的输出成为本阶段的输入
    
    mongodb在2.2版本中引入了聚合框架,其基本功能有两个：
        对文档进行“过滤”，筛选出合适的文档
        对文档进行“变换”，改变文档的输出形式
        
        语法:
            db.collection.aggregate(pipeline, options)
        参数:
            pipeline	array	聚合管道阶段对应的数组
        返回值:
            文档游标
            
    聚合表达式
        1. 字段路径表达式  
            使用$来指示字段路径 : $<field>
            使用$和.来指示内嵌文档字段路径 : $<field>.<sub-field>
                $info.name
        
        2. 系统变量表达式
            使用$$来指示系统变量 : $$<variable> 
                $$CURRENT: 管道中的当前文档
        
        3. 常量表达式
            使用$literal:<value>指示常量值value
                $literal:"$info"
                
    聚合管道阶段
        $project - 对输入的文档进行再次投影
        $match   - 对输入的文档进行筛选
        $limit   - 筛选出管道内的前N篇文档
        $skip    - 跳过管道内的前N篇文档
        $unwind  - 展开输入文档中的数组字段
            db.accounts.aggregate([
                {
                    $unwind:{
                        path:"$currency", // path代表要展开的数组字段
                        includeArrayIndex:"$currency",  // includeArrayIndex代表item在原array中的index
                        preserveNullAndEmptyArrays:true // preserveNullAndEmptyArrays值为true时,在展开数组时会保留注意点中通不过$unwind阶段的文档
                    } 
                }
            ])
            注意点 当$unwind时 文档所对应的字段不存在,为null或者是一个空数组, 这些文档是通不过该阶段的
            
        $sort    - 对输入文档进行排序
        $lookup  - 对输入的文档进行查询操作
        $group   - 对输入文档进行分组
        $out     - 将管道中的文档输出
*/

db.accounts.update(
    {"name.firstName":"A"},
    {$set:{currency:["CNY","USD"]}}
)
db.accounts.update(
    {"name.firstName":"B"},
    {$set:{currency:"GBP"}}
)

db.accounts.aggregate([
    {
      $project: {
          _id:0
      }  
    },
    {
        $unwind:{
            path:"$currency",
            includeArrayIndex:"ccyIndex"
        } 
    }
])

db.accounts.insertMany([
    {name:{firstName:"C",lastName:"mac"},balance:52},
    {name:{firstName:"D",lastName:"mac"},balance:53,currency:null},
    {name:{firstName:"E",lastName:"mac"},balance:54,currency:[]}
])

db.accounts.aggregate([
    {
      $project: {
          _id:0
      }  
    },
    {
        $unwind:{
            path:"$currency",
            includeArrayIndex:"ccyIndex",
            preserveNullAndEmptyArrays:true
        } 
    }
])
