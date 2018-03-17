/**
 * Created by mastermin on 17-11-7.
 */
import {Component, View} from "angular2/core";//依赖注入

@Component({
    selector: 'my-app'//选择器
})

@View({
    template: '<h2>hello world</h2>'//模板
})

export class HelloComponent {

}//输出组件