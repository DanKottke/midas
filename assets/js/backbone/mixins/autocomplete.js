// The semicolon at the beginning is in case of another library breaking ours (prevents ASI errors).
// This plugin is being created using absolutely 0 semi-colons.  We are using our knowledge of Automatic
// semicolon insertion (ASI) in JavaScript to do that for us, so we don't have to.  It's an experiment in cleanliness
// if nothing else.

;(function ($) {

  $.fn.midasAutocomplete = function (options) {
    options = options || {}

    var $input                = this,
        on                    = options.on,
        type                  = options.type,
        $inputData            = $input.val(),
        backbone              = options.backbone,
        queryParam            = options.queryParam,
        contentType           = options.contentType,
        apiEndpoint           = options.apiEndpoint,
        backboneEvents        = options.backboneEvents,
        searchResultsWrapper  = options.searchResultsClass,

        // Here they can override the success and failure messages completely
        // But this override is not implemented yet.
        success               = options.success || (function () {}),
        failure               = options.failure || (function () {})


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
      var typeOfBackboneParam = typeof backbone

      switch (typeOfBackboneParam) {
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

    }

    function initializeBackboneAutocomplete () {
      console.log("Not yet implemented")
    }


    // -----------------------------
    //= Begin AJAX Implementation
    // -----------------------------
    function initializeAjaxAutocomplete () {

      // We need to make sure we check that the user didn't add a trailing / 
      // as the backend will respond to a /path?QUERYPARAM=foo
      // Not a /path/?queryPARAM=foo
      // so we need to make sure we pop that off if it is there
      var cleanedEndpoint = removeTrailingBackslash(apiEndpoint)

      $.ajax({

        url: cleanedEndpoint + '?' + queryParam + '=' + $inputData,
        type: type,
        contentType: contentType,

        success: function (data) {

          // This won't work, but somehow check if they have set it on the front-end and 
          // if so use that success method instead of this one.
          // if (success) {
            // success(data) // here what I am trying to show is we want to pass data to success method
          // },

          var i = 0,
              results = data.length

          // On each new successful character search, 
          // replace the previous results, and append the new results.
          $(searchResultsWrapper).children().remove()

          for ( ; i < results; i += 1 ) {
            $(searchResultsWrapper).append(template(data[i]))
          }

        },

        error: function (err) {
          if (!err.responseText) console.warn("Please add some response text to your server side error")
          if (typeof err.responseText === "string") this.json = JSON.parse(err.responseText)

          alert("Expects a hash of { 'message': 'error message' } (Here's ours):" + " " + this.json.message)
        }

      })
    }

    // The template classes don't really need to be customized, they can just expect them and then
    // style to that effect.  The reason they don't need to be customized is because they are being appended
    // to a customizable container.  So with that it's enough and we can just allow them to expect this.
    function template (result) {
      // Here we are going to want to abstract out what the result.____ methods are
      // so for instance if the result.target is something that is used, then we use that.
      // but if instead the user wants to send something back from the server like { foo: 'val', bar: 'val' }
      // then we somehow need to be able to handle it here in the template.
      // 
      // OR the other optinos is to say that these words target and value are standardized enough for an autocomplete
      // that they can then craft the backend to match this API expectation on the front-end.  I think that is a more
      // elegant solution.  
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

  // ------
  // = UTILITY Function 
  // ------
  function removeTrailingBackslash (str) {
    var _s  = str.split(""),
        len = _s.length - 1

    if (_s[len] === "/") {
      return _s.pop()
    }

  }


}(jQuery));