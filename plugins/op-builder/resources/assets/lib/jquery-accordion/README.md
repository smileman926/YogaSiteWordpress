# jQuery Accordion

Simple jQuery accordion library, perfect for FAQ (Frequently Asked Question) list.

## Usage

    <div  class="faq">
    	<div  class="faqitem">
    		<div  class="header">Test</div>
    		<div  class="content">test content</div>
    	</div>
    	<div  class="faqitem">
    		<div  class="header">Test</div>
    		<div  class="content">test content</div>
    	</div>
    	<div  class="faqitem">
    	<div  class="header">Test</div>
    		<div  class="content">test content</div>
    	</div>
    </div>

    <script>
    	$(".faq").accordion(options);
    </script>

## API

All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.


| Option  | Type | Default value | Description |
| ----- | ----- | ----- | ----- |
| duration | number | 200 | Animation duration in ms |
| closeOthers | boolean | true | Show only one element at the same time |
| questionClass | string | '.question' | Question class selector |
| answerClass | string | '.answer' | Answer class selector |
| itemClass | string | '.faqitem' | Accordion item class selector |

## Events
| Name  | Description |
| ----- | ----- |
| jqueryaccordioninit | Accordion is initialized |
| jqueryaccordiontoggle | Before accordion item is opened/closed |
| jqueryaccordiontoggled | After accordion item is opened/closed |
| jqueryaccordiondestory | Accordion is destroyed |
