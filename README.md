# ionic 4 forms implimentation with localstorage and sqlite plugin

#create ionic 4 app

#install ionic/storage using this command
npm install --save @ionic/storage

#make service for crud operation
ionic generate service user

#For making form for add user you need to import ReactiveFormsModule in your current page module.ts file
@ngModule 
{
    ReactiveFormsModule
}