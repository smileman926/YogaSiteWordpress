class OP3MovingImage {
    constructor(selector, $) {
        // Initialize the slider
        let _this     = this;
        this.selector = selector;
        this.$        = $;
        this.items    = [];

        $(selector).each((index, element) => {
            // Let's prepare all the elements
            let $container = $(element);
            let $img       = $container.find('img');
            let src        = $img.attr('src');
            let image      = new Image();

            // Check when the image is loaded
            if (src) {
                image.onload = function () {
                    $img.src = this.src;

                    // Calculate the height difference for the image slider
                    let heightDifference = parseInt($img.height() - $container.height());

                    if (heightDifference > 0) {
                        // Set the transform duration based on the image haught
                        $container.attr('data-transform-y', heightDifference);
                        $container.find('img').css('transition', `transform ${heightDifference / 200}s ease-in-out`);

                        // Add hover/out events to slide the image up/down
                        $container
                            .hover(
                                () => {
                                    $container.find('img').css('transform', `translateY(-${$container.attr('data-transform-y')}px)`);
                                },
                                () => {
                                    // $container.find('img').css('transition', `transform 0.3s ease-in-out`);
                                    $container.find('img').css('transform', ``);
                                }
                            )
                        ;
                        _this.items.push($container);
                    }
                };

                // Set src to actual src to load
                image.src = src;
            }
        });
    }

    destroy() {
        let _this = this;

        _this.items.forEach( ($image) => {
            $image.unbind();
        });

        _this.items = [];
    }
}

export default OP3MovingImage;
