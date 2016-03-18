<?php

namespace Project\Classes\Config;


class OAuthInfo {
  const GITHUB = [
    'callbackUrl' => 'https://github.com/login/oauth/authorize?scope=user:email&client_id=76410de7fda4780c4caa',
    'tokenUrl' => 'https://github.com/login/oauth/access_token',
    'client_id' => '76410de7fda4780c4caa',
    'client_secret' => 'c710a9e95da7d0cbe10d8bf2cadf101dae64f548',
  ];
}