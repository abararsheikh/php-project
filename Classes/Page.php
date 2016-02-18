<?php

namespace Project\Classes;

/**
 * Page class is responsible for dynamically generating a page.
 * The simplest way to use is:
 *   $page = new Page();
 *   $page->generate('path/to/targetPage');
 * It assumes css, js, and title have the same name.
 * It is also possible to pass in array of options.
 *
 *
 * @Author Yi Zhao
 */

class Page {
  private $title = '';
  private $header = '';
  private $footer = '';
  private $content = [];
  private $css = [];
  private $js = [];

  public function __construct(array $options) {
    $this->setPage($options);
  }
  public function setPage(array $options) {
    $this->title = isset($options['title']) ? $options['title' ] : '';
    $this->header = isset($options['header']) ? $this->getRoot() . $options['header'] : '';
    $this->footer = isset($options['footer']) ? $this->getRoot() . $options['footer'] : '';
    $this->content = isset($options['content']) ? $options['content'] : [];
    $this->css = isset($options['css']) ? $options['css'] : [];
    $this->js = isset($options['js']) ? $options['js'] : [];
  }

  private function getRoot() {
    return $_SERVER['DOCUMENT_ROOT'] . '/';
  }
  private function addCSS() {
    foreach ($this->css as $css) {
      echo "<link href='$css' />";
    }
  }
  private function addJS() {
    foreach ($this->js as $js) {
      echo "<script src='$js'></script>";
    }
  }
  // Provides an easier way to setup a page.
  // Assumes php, js, and css files have the same name.
  private function quickSet($fileName) {
    $root = $this->getRoot();
    $pattern = '/\/\w+$/';
    preg_match($pattern, $fileName, $name);
    !empty($this->header) || $this->header = $root . preg_filter($pattern, 'header.php', $fileName);
    !empty($this->footer) || $this->footer = $root . preg_filter($pattern, 'footer.php', $fileName);
    $this->content[]  = $root . $fileName . '.php';
    $this->js[]  = $root . 'js' . $name[0] . '.js';
    $this->css[]  = $root . 'css' . $name[0] . '.css';
  }
  private function addBody() {
    include $this->header;
    foreach ($this->content as $content) {
      include $content;
    }
   include $this->footer;
  }
  public function generate($fileName = null, $title = null) {
    if ($fileName) $this->quickSet($fileName);
    if ($title) $this->title = $title;

    echo "
      <html>
      <head>
       <title>$this->title</title>" .
        $this->addCSS() .
      "</head>
      <body>";
        $this->addBody();
        $this->addJS();
    echo "
      </body>
      </html>
    ";
  }

}
// test code
$p = new Page([
  'title' => 'test',
  'header' => 'Classes/header.php',
  'footer' => 'Classes/footer.php'
]);

$p->generate('validation/Validator');