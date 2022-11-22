

class chatEngine{
    constructor(userEmail){
        this.userEmail = userEmail

        this.socket = io.connect('http://localhost:5000');
        /////changed io.connect('http://localhost:5000)////// 


        if(this.userEmail){
            
            this.connectionHandler();
        }
    }

    connectionHandler(){
        
        this.socket.on('connect',function(){
            console.log('connection is made using socket');
        })
    }

}