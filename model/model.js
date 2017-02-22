/**
 * Created by winty on 2016/8/16.
 */
var mongoose=require('mongoose');

//定义章节
var spotSchema = new mongoose.Schema({
    title: {   //章节题目
        type: String,
        require: true
    },
    label: {   //层级描述
        type: String,
        require: true
    },
    subSpot:[this]  //子层级
});
//定义推荐资源
var linkSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true
    },
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    clickNum: {
        type:Number,
        "default":0
    }
});
//定义回答
var answerSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }, //回答的用户
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    likeNum: {  //点赞数
        type:Number,
        "default":0
    }
});
//定义评论
var commentSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }, //评论的用户
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    }
});
//定义消息
var messageSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }, //发消息的用户
    content:{
        type:String,
        require:true
    },
    messageType:{
        type:Number,
        "default":0   //0表示发送的消息，1表示接收的消息，2表示系统发过来的消息
    },
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    }
});
//定义测试题
var itemSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    choice:[],//选项
    correctChoice:{   //正确答案，1->A,2->B,3->C,4->D...
        type:Number,
        require:true
    },
    explain:String,
    belong:String,//所属章节
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    }
});
//定义问题
var questionSchema = new mongoose.Schema({
    content:{
        type:String,
        require:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }, //提问的用户
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    grade: {  //总评分(每个用户的评分加权/总人数)
        type:Number,
        "default":0
    },
    beFocused:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }, //关注该问题的用户
    answers:[answerSchema]  //该问题的回答
});
//定义课程信息
var subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    imageId:'',//存封面图片id
    desc: {
        type: String,
        require: true
    },
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建日期
    },
    level:{ //难度：1.初级 2.中级 3.高级
        type:Number,
        "default":1
    },
    learnTime:{  //小时数，以0.5小时为基本单位
        type:Number,
        "default":1
    },
    spots:[spotSchema],
    content: {
        type: String,
        require: true
    },
    mustKnow: {
        type: String,
        require: true
    },
    beFocused:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }, //关注该课程的用户
    practice:[linkSchema],//对应的习题链接
    moreInfo:[linkSchema], //推荐的更多学习资源
    Questions:[questionSchema],  //该课程的问答
    comments:[commentSchema],
    author:{
        type: mongoose.Schema.Types.ObjectId, //发布者的引用
        ref: 'User', //引用自User Model
        require: true //非空
    }
});
//用户Schema定义
var userSchema = new mongoose.Schema({
    userName: String, //用户名的类型为字符串
    password: {
        type: String, //密码的类型为字符串
        require: true //非空
    },
    created: {
        type: Date, //创建日期的类型为日期类型
        "default": Date.now //默认值为创建时间
    },
    power:{
        type:Number,//1为普通用户，0为管理员
        "default":1
    },
    portrait:{
        type:String,
        "default":''
    },
    wechat:{
        type:String,
        "default":''
    },
    qq:{
        type:String,
        "default":''
    },
    phone:{
        type:String,
        "default":''
    },
    signature:{
        type:String,
        "default":''
    },
    mySubjects:{  //关注的课程
        subjects:[subjectSchema],
        progress:{  //学习该课程的进度(学习章数/总数)
            type:Number,
            "default":0
        }
    },
    myQuestions:{ //我的提问
        questions:[questionSchema]
    },
    myGrades:{  //我给过的评分
        questions:[questionSchema]
    },
    myLikes:{   //点过赞的回答
        answers:[answerSchema]
    },
    myAnswers:{  //我的回答
        answers:[answerSchema]
    },
    myComments:{ //我的评论
        subjects:[subjectSchema]
    },
    myPersons:{ //关注的人
        users:[this]
    },
    myMessages:{ //我的消息
        readMessages:[messageSchema],
        unreadMessage:[messageSchema]
    },
    myMarks:{
        items:[itemSchema]
    }
});

mongoose.model('User', userSchema);
mongoose.model('Subject', subjectSchema);
mongoose.model('Spot', spotSchema);
mongoose.model('Link', linkSchema);
mongoose.model('Question', questionSchema);
mongoose.model('Answer', answerSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Message', messageSchema);
mongoose.model('Item', itemSchema);

