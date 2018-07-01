module.exports = (command) => {
  let msg;
  if (command === 'app') {
    msg = `\nUsage: amur app [appName]\n\n\
\tWhere appName is optional. If you specify it, a new app is created in\n\
\tthat directory relative to process.cwd(). If you don't specify it, the\n\
\tnew app is generated in your current working directory.\n`;
  } else if (command === 'resource') {
    msg = `\nUsage: amur resource ModelName[/collectionName] field1 [field2... fieldN]\n\n\
A field follows the following rules: \n\
\n\tIf field is a nonreference type, it's format is\
\n\tfieldName[:Type[:defaultValue]].\n\
\n\tIf field is a reference type, it's format is \
\n\tfieldName:Type[:foreignKey].\n\
\n\tType syntax is TypeDefinition followed by modifiers.\
\n\tBuiltin types including String, Int, Float, Number, Boolean, Date and\
\n\tEnum. Number is equivalent to Int. Other types you specified are treated\
\n\tas reference types. You can surround type with []. It will be treated as\
\n\tan array of types. Modifiers including required(!), index(^), unique($),\
\n\tminValue(>=[n]), maxValue(<=[n]), stringMatch(/[regexp]/).
\n\tIf you want nested structure, set the type of the object to be { or [{.\
\n\tAfter object ends, specify an empty field } or }] to mark the end of the\
\n\tblock.\
\n\nExamples: \n\
\n\tamur resource User 'email:String/.+@.+\\..+/!^$' 'password:String!' \\\
\n\tage:Int 'gender:Enum{male,female}' posts:[Post]:author\n\
\n\tamur resource BillingInfo contact:{ phoneNo:String name:String } \\\
\n\taddress:{ line1:String line2:String } order:Order\n`;
  } else if (command === 'schema') {
    msg = `\nUsage: amur schema SchemaName field1 [field2... fieldN]\n\
\n\tIt creates reusable subschemas for other API resources. It follows \
\n\tthe same field definition conventions with resource generator.\n`;
  } else {
    msg = '\nUsage: amur <command> [args...]\
    \n\nCommands:\
    \n\n\tapp\t\tCreate a brand new app.\
    \n\n\tresource\tGenerate a set of API resource.\
    \n\n\tschema\t\tGenerate a reusable schema for API resouces.\
    \n';
  }

  process.stdout.write(msg + '\n');
  process.exit(0);
};
