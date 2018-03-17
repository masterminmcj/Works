function  Animal(sound){
    this.talk=function () {
        console.log(sound)
    }
}


var dog=new Animal('wang');
var cat=new Animal('miao');

dog.talk();
cat.talk();

