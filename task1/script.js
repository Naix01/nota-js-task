$(document).ready(function() {
    // Add a click event handler to all buttons with class "swap-btn"
    $('.swap-btn').click(function() {
        var $button = $(this);
        var $siblings = $button.siblings('.swap-btn'); // Find adjacent buttons

        if ($siblings.length > 0) {
            // Swap with the first available upper neighbor
            $siblings.first().before($button);
        } else {
            // Swap with the first available lower neighbor
            $siblings = $button.siblings().addBack();
            $siblings.last().after($button);
        }
    });
});
