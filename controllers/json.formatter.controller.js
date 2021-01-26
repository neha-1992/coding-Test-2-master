
var jsconController = {};

jsconController.transformedJsonData= function(req,callback){
    var get_value= req.body.payload;
    var refernceData = req.body.referenceData;
    if(get_value.valueType == "array"){
    get_value.value.forEach(element => {
           switch (element.valueType) {
               case "array":
                    valueTypeArrayFunction(element.value,refernceData);
                   break;
                case "string":
                let result_value =  convertReferenceDataValue(element.value,refernceData);
                element.value = result_value;
                   break;
               default:
                   break;
           }
    });
   return  callback(get_value);
    }
};

var convertReferenceDataValue= function( value_string,refernceData){
    if(value_string.includes("{REF_MSISDN}"))
         return value_string.replace("{REF_MSISDN}",refernceData['REF_MSISDN']);
    if(value_string.includes("{REF_IMSI}"))
            return value_string.replace("{REF_IMSI}",refernceData['REF_IMSI']);
     if(value_string.includes("{REF_SERVPROFID}"))
        return value_string.replace("{REF_SERVPROFID}",refernceData['REF_SERVPROFID']);
    else
        return value_string;

}

var valueTypeArrayFunction= function( valueArray,refernceData){
valueArray.forEach(element => {
    if(element.valueType == "array"){
        valueTypeArrayFunction(element.value,refernceData);
    }
    if(element.valueType == "string"){
     var result_value =  convertReferenceDataValue(element.value,refernceData);
     element.value = result_value;
    }
});
}

module.exports = jsconController;
