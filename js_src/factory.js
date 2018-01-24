
import * as d from './data.js'
export class Factory{
  constructor(classType, dataName){
    this.classType = classType;
    this.dataName = dataName;
    this.templates = {};
  }

  learn(template){
    //template.name is default for template.templateName
    this.templates[template.templateName ? template.templateName : template.name] = template;
  }

  create(templateName){
    let product = new this.classType(this.templates[templateName]);
    d.DATA[this.dataName][product.getId()] = product;
    return product;
  }



}
