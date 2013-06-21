# Performance Platform Labs

Experiments for the [GOV.UK Performance Platform](https://www.gov.uk/performance).

# User journeys using sankey diagrams

1. Query GA using http://ga-dev-tools.appspot.com/explorer/
    - use "ga:pagePath,ga:previousPagePath" for dimensions
    - use eg. "ga:visitors" for metrics
    - apply a filter for a subset of the site that you want to generate
      a user journey for
2. Download results as Excel TSV file
3. Remove metadata from a result. Your CSV file should look similar to:

    ```
    ga:pagePath,ga:previousPagePath,ga:visitors
    /,(entrance),928802
    /,/a-site,72649
    /,/some-other-site,38
    /,/yet-another-site,38
    ```

4. Use 'grapharizer.py' to generate JSON config for sankey.js.
    - change 'start_path' variable to a path that is an entry
       to a user journey
    - change 'filename' variable to a name of a file that you downloaded
       from Google Analytics Query Explorer
    - save the output to a file in 'funnel' directory
5. Change 'JSON_DATA_FOR_SANKEY' variable in 'sankey.html' to a name of a file
   generated using 'grapharizer.py'
