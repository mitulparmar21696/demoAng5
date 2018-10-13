// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  WebAPIUrl:'http://amtapi.aseuminfo.com/Adminpanel.svc/',
  WebAPIUrl2:'http://amtapi.aseuminfo.com/App.svc/',
  // DefaultImageTourtype : 'http://amtapi.aseuminfo.com/Uploads/tourtypes/636623194022477147.jpg',
  DefaultImageTourtype : '/assets/images/user.png'
};
