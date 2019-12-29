<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OptimizePress Integrations</title>
    <link href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" crossorigin="anonymous">

</head>
<body>
<div class="container">
    <div class="header clearfix">
        <h2 class="text-muted"><a href="{{ route('optimizepress.integrations.index') }}">OptimizePress Integrations</a></h2>
    </div>

    <hr>

    @yield('main')

    <br><br><br><br><br>
</div>
</body>
</html>
