A "classmap" section was added to the composer file to avoid the use of "require_once" as examples do. Now you can just call:

MailWizzApi_Autoloader::register();

Please see the examples folder for usage and available endpoints.
