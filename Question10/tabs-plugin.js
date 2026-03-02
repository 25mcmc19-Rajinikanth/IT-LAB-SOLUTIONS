(function($) {

    $.fn.simpleTabs = function(options) {

        const settings = $.extend({
            activeClass: "active",
            animationSpeed: 300,
            defaultTab: null
        }, options);

        return this.each(function() {

            const container = $(this);
            const tabs = container.find(".tabs li");
            const contents = container.find(".tab-content");

            
            function activateTab(tabName) {

                tabs.removeClass(settings.activeClass);
                contents.hide();

                const activeTab = tabs.filter(`[data-tab='${tabName}']`);
                const activeContent = container.find("#" + tabName);

                activeTab.addClass(settings.activeClass);
                activeContent.fadeIn(settings.animationSpeed);

                
                window.location.hash = tabName;
            }

           
            tabs.click(function() {
                const tabName = $(this).data("tab");
                activateTab(tabName);
            });

           
            tabs.attr("tabindex", "0"); 

            tabs.keydown(function(e) {

                const currentIndex = tabs.index(this);

                if (e.key === "ArrowRight") {
                    const nextIndex = (currentIndex + 1) % tabs.length;
                    tabs.eq(nextIndex).focus().click();
                }

                if (e.key === "ArrowLeft") {
                    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                    tabs.eq(prevIndex).focus().click();
                }

            });

            
            const hash = window.location.hash.replace("#", "");

            if (hash && container.find("#" + hash).length) {
                activateTab(hash);
            } else if (settings.defaultTab) {
                activateTab(settings.defaultTab);
            } else {
                activateTab(tabs.first().data("tab"));
            }

        });
    };

})(jQuery);