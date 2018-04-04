    class Boy extends egret.Sprite
    {
        public constructor()
        {
            super();
        }
        public order()
        {
            //生成约会事件对象
            var daterEvent:DateEvent = new DateEvent(DateEvent.DATE);
            //添加对应的约会信息
            daterEvent._year = 2014;
            daterEvent._month = 8;
            daterEvent._date = 2;
            daterEvent._where = "肯德基";
            daterEvent._todo = "共进晚餐";
            //发送要求事件
            this.dispatchEvent(daterEvent);
        }
    }