(function ($) {

  $.fn.midasAutocomplete = function (options) {
    options = options || {}

    var $input          = this,
        on              = options.on,
        type            = options.type,
        $inputData      = $input.val(),
        backbone        = options.backbone,
        apiEndpoint     = options.apiEndpoint,
        backboneEvents  = options.backboneEvents,
        success         = options.success || (function () {}),
        failure         = options.failure || (function () {})


    // If we are using the backbone event bus then skip all binding, and move onto another check.
    if (backboneEvents === true) {
      fetchDataUsingBackboneOrAjax()
    }

    if (typeof on === "string") {
      $input.bind(on, function () {
        fetchDataUsingBackboneOrAjax()
      })
    }

    function fetchDataUsingBackboneOrAjax () {
      var typeOfBackbone = typeof backbone;

      switch (typeOfBackbone) {
        case "object":
          initializeBackboneAutocomplete()
          break
        case "boolean" || "undefined":
          // If they accidentally passed a boolean of true, expecting us to handle the rest, prompt them on how
          // incorrect that is.
          if (backbone === true) console.warn("You need to pass an object to the backbone paramater, with your views and models to spin up.  True won't cut it.")
          initializeAjaxAutocomplete()
          break
      }

      // if (typeof backbone === "object") {
      //   if (backbone.model === undefined || backbone.view === undefined) console.warn("Please pass a model and search result view to work with")
      //   // init all the models, views, etc passed in because we have a person
      //   // that wants to run this plugin based on a backbone architecture
      //   initializeBackboneAutocomplete(model, view)

      //   // We have a requirement that the backbone option be an object, because if they accidentally pass backbone: true, then we 
      //   // cant really help them but we do prompt them.
      // } else if (typeof backbone !== "object" || backbone === false || backbone === undefined || backbone === null) {
      //   if (backbone === true) console.warn("You need to pass an object to the backbone paramater, with your views and models to spin up.  True won't cut it.")
      //   initializeAjaxAutocomplete();
      // }

    }

    function initializeBackboneAutocomplete () {
      console.log("Not yet implemented");
    }



    // -----------------------------
    //= Begin AJAX Implementation
    // -----------------------------
    function initializeAjaxAutocomplete () {

      $.ajax({

        url: apiEndpoint + $inputData,
        type: type,

        success: function (data) {
          var i = 0,
              results = data.length;

          // On each new successful character search, 
          // replace the previous results, and append the new results.
          $(".search-result-wrapper").children().remove();

          for ( ; i < results; i += 1 ) {
            $(".search-result-wrapper").append(template(data[i]));  
          }

        },

        error: function (err) {
          if (!err.responseText) console.warn("Please add some response text to your server side error")
          if (typeof err.responseText === "string") this.json = JSON.parse(err.responseText)

          alert("Expects a hash of { 'message': 'error message' } (Here's ours):" + " " + this.json.message);
        }

      });
    }

    function template (result) {
      return " " +
        "<div class='user-photo'> " + 
          "<div class='search-result-row'> " +
            result.target +
            "<br />" + 
            result.value +
          "</div>" + 
        "</div>"
    }

  }


}(jQuery));