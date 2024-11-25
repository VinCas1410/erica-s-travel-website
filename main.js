$(document).ready(function () {
    const rssUrl = 'https://vincas1410.github.io/blog_index/xml/index.xml';

    // Fetch the RSS XML
    $.ajax({
        type: 'GET',
        url: rssUrl,
        dataType: 'xml',
        success: function (xml) {
            $('#articles').empty(); // Clear existing content

            $(xml)
                .find('item')
                .each(function (index, item) {
                    const $item = $(item);
                    const title = $item.find('title').text().trim();
                    const link = $item.find('link').text().trim();
                    const pubDate = $item.find('pubDate').text().trim();
                    const description = $item.find('description').text().trim();

                    // Escape the description to avoid HTML or attribute injection issues
                    const safeDescription = encodeURIComponent(description);

                    const articleHtml = `
                        <li>
                            <a href="javascript:void(0);" class="article-link" 
                               data-link="${link}" 
                               data-description="${safeDescription}" 
                               data-title="${title}" 
                               data-pubdate="${pubDate}">
                                ${title}
                            </a>
                        </li>
                    `;

                    $('#articles').append(articleHtml);
                });

            // Handle dynamic click events
            $('#articles').on('click', '.article-link', function () {
                const $this = $(this);
                const title = $this.data('title');
                const pubDate = $this.data('pubdate');
                const description = decodeURIComponent($this.data('description')); // Decode the description

                $('#articleTitle').text(title);
                $('#articleDate').text(pubDate);
                $('#articleBody').html(description); // Safely inject the description into the DOM

                $('#articleContent').show();
            });
        },
        error: function () {
            alert('Error loading RSS feed');
        },
    });
});
