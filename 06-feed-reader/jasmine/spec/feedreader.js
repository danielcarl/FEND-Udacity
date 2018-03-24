/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* RSS Feed initialization tests */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).toBeGreaterThan(0);
        });


        /* This test loops through each feed to make sure that url is
         * is defined and not empty.
         */
         it('all feeds have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
         });


        /* This test loops through each feed to make sure that name is
         * defined and not empty.
         */
         it('all feeds have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0);
            });
         });
    });

    /* Menu functionality tests */
    describe('The menu', function() {
        /* This test verifies that the menu is hidden by default
         * (body has class of menu-hidden)
         */
         it('menu element is hidden by default', function() {
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
         });

         /* This test verifies that clicking the hamburger icon
          * properly toggles visibility of the menu.
          */
          it('menu changes visibility when clicked', function() {
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBeFalsy();
            $(".menu-icon-link").click();
            expect($("body").hasClass("menu-hidden")).toBeTruthy();
          });
    });

    /* Initial Entry test */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test verifies that a call to loadFeed results in at least
         * one .entry result.
         */
        it('loadFeed() has at least one .entry element after called', function() {
            expect($(".feed .entry").length).toBeGreaterThan(0);
        });
    });

    /* New Feed Selection test */
    describe('New Feed Selection', function() {

        var firstEntry, differentEntry, sameEntry;

        /* First call to loadFeed()
        */
        beforeEach(function(done) {
            loadFeed(1, function() {
                firstEntry = $(".entry").first().html();
                done();
            });
        });

        describe('Call loadFeed() With Different feed_id', function() {

            /* Second call to loadFeed() with different feed id
            */
            beforeEach(function(done) {
                loadFeed(2, function() {
                    differentEntry = $(".entry").first().html();
                    done();
                });
            });

            /* This test verifies that loading a new feed changes the content. The assignment of differentEntry 
             * is populated with the call to init(0) in app.js.
             */
            it('Call to loadFeed() with a new id returns different results', function() {
                console.log("first entry: " + firstEntry);
                console.log("different entry: " + differentEntry);
                expect(firstEntry).toBeDefined();
                expect(firstEntry).not.toBe(null);
                expect(differentEntry).toBeDefined();
                expect(differentEntry).not.toBe(null);
                expect(firstEntry).not.toEqual(differentEntry);
            });
        });

        describe('Call loadFeed() With Same feed_id', function() {

            /* Second call to loadFeed() with same feed id
            */
            beforeEach(function(done) {
                loadFeed(1, function() {
                    sameEntry = $(".entry").first().html();
                    done();
                });
            });

            /* This test verifies that calling loadFeed() with the same feed_id gives the
             * same results.
             */
            it('Call to loadFeed() with the same id returns same results', function() {
                console.log("first entry: " + firstEntry);
                console.log("same entry: " + sameEntry);
                expect(firstEntry).toBeDefined();
                expect(firstEntry).not.toBe(null);
                expect(sameEntry).toBeDefined();
                expect(sameEntry).not.toBe(null);
                expect(firstEntry).toEqual(sameEntry);
            });
        });

    });

}());
