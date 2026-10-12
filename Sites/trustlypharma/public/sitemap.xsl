<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Trustly Pharma</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #020e24;
            color: #e2e8f0;
            line-height: 1.5;
            padding: 24px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: linear-gradient(135deg, #071c3f 0%, #03112c 100%);
            border: 1px solid rgba(141, 168, 195, 0.25);
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 24px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
            border-radius: 9999px;
            padding: 4px 12px;
            font-size: 11px;
            font-family: monospace;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 12px;
          }
          h1 {
            color: #ffffff;
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }
          p.lead {
            color: #94a3b8;
            font-size: 14px;
            max-width: 800px;
            margin-bottom: 16px;
          }
          .meta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding-top: 16px;
            border-top: 1px solid rgba(141, 168, 195, 0.2);
            font-size: 13px;
            font-family: monospace;
          }
          .meta-item {
            color: #cbd5e1;
          }
          .meta-item strong {
            color: #38bdf8;
          }
          .filter-box {
            background: #071c3f;
            border: 1px solid rgba(141, 168, 195, 0.25);
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .filter-box input {
            flex: 1;
            background: #020e24;
            border: 1px solid rgba(141, 168, 195, 0.3);
            border-radius: 8px;
            padding: 10px 14px;
            color: #ffffff;
            font-size: 14px;
            font-family: monospace;
            outline: none;
          }
          .filter-box input:focus {
            border-color: #38bdf8;
          }
          .table-wrap {
            background: #031433;
            border: 1px solid rgba(141, 168, 195, 0.2);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          thead {
            background: #071c3f;
            border-bottom: 1px solid rgba(141, 168, 195, 0.25);
          }
          th {
            text-align: left;
            padding: 14px 18px;
            color: #94a3b8;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid rgba(141, 168, 195, 0.12);
          }
          tr:hover td {
            background-color: rgba(56, 189, 248, 0.05);
          }
          a {
            color: #38bdf8;
            text-decoration: none;
            word-break: break-all;
          }
          a:hover {
            color: #7dd3fc;
            text-decoration: underline;
          }
          .pill {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-family: monospace;
            font-weight: 700;
          }
          .pill-prio-high {
            background: rgba(16, 185, 129, 0.15);
            color: #34d399;
            border: 1px solid rgba(16, 185, 129, 0.3);
          }
          .pill-prio-med {
            background: rgba(56, 189, 248, 0.15);
            color: #38bdf8;
            border: 1px solid rgba(56, 189, 248, 0.3);
          }
          .pill-prio-low {
            background: rgba(148, 163, 184, 0.15);
            color: #cbd5e1;
            border: 1px solid rgba(148, 163, 184, 0.3);
          }
          .freq-pill {
            background: #071c3f;
            color: #e2e8f0;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-family: monospace;
          }
          .date-cell {
            color: #94a3b8;
            font-family: monospace;
            font-size: 12px;
          }
          .footer-note {
            margin-top: 24px;
            text-align: center;
            font-size: 12px;
            color: #64748b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="badge">Machine &amp; Human Discoverable Sitemap</div>
            <h1>Trustly Pharma XML Sitemap</h1>
            <p class="lead">
              Official XML sitemap for Trustly Pharma indexing canonical chemical compound monographs, biochemical pathways, verified research suppliers, and statutory regulatory trackers. Formatted according to the Sitemaps.org protocol.
            </p>
            <div class="meta-row">
              <div class="meta-item">
                Canonical Domain: <strong>https://trustlypharma.uk</strong>
              </div>
              <div class="meta-item">
                Total URLs Indexed: <strong><xsl:value-of select="count(sitemap:urlset/sitemap:url) + count(sitemap:sitemapindex/sitemap:sitemap)"/></strong>
              </div>
              <div class="meta-item">
                Discovery: <strong><a href="/sitemap/">HTML Sitemap</a></strong> | <strong><a href="/llms.txt">llms.txt</a></strong> | <strong><a href="/robots.txt">robots.txt</a></strong>
              </div>
            </div>
          </div>

          <xsl:choose>
            <!-- SITEMAP INDEX -->
            <xsl:when test="sitemap:sitemapindex">
              <div class="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 70%;">Sitemap URL</th>
                      <th style="width: 30%;">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                      <tr>
                        <td>
                          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                        </td>
                        <td class="date-cell">
                          <xsl:value-of select="sitemap:lastmod"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:when>

            <!-- URLSET -->
            <xsl:otherwise>
              <div class="filter-box">
                <input type="text" id="filterInput" placeholder="Filter URLs by keyword (e.g. bpc-157, regulatory, vendors)..." onkeyup="filterTable()" />
              </div>

              <div class="table-wrap">
                <table id="sitemapTable">
                  <thead>
                    <tr>
                      <th style="width: 50%;">Canonical Location</th>
                      <th style="width: 15%;">Priority</th>
                      <th style="width: 15%;">Change Frequency</th>
                      <th style="width: 20%;">Last Modified</th>
                    </tr>
                  </thead>
                  <tbody>
                    <xsl:for-each select="sitemap:urlset/sitemap:url">
                      <tr>
                        <td>
                          <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                        </td>
                        <td>
                          <xsl:choose>
                            <xsl:when test="number(sitemap:priority) &gt;= 0.9">
                              <span class="pill pill-prio-high"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:when test="number(sitemap:priority) &gt;= 0.8">
                              <span class="pill pill-prio-med"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:when>
                            <xsl:otherwise>
                              <span class="pill pill-prio-low"><xsl:value-of select="sitemap:priority"/></span>
                            </xsl:otherwise>
                          </xsl:choose>
                        </td>
                        <td>
                          <span class="freq-pill"><xsl:value-of select="sitemap:changefreq"/></span>
                        </td>
                        <td class="date-cell">
                          <xsl:value-of select="sitemap:lastmod"/>
                        </td>
                      </tr>
                    </xsl:for-each>
                  </tbody>
                </table>
              </div>
            </xsl:otherwise>
          </xsl:choose>

          <div class="footer-note">
            Trustly Pharma &copy; 2026 &middot; Automated Sitemaps &amp; Discovery Engine &middot; Generated via Sitemaps.org Protocol
          </div>
        </div>

        <script type="text/javascript">
          function filterTable() {
            var input = document.getElementById("filterInput");
            if (!input) return;
            var filter = input.value.toLowerCase();
            var table = document.getElementById("sitemapTable");
            var trs = table.getElementsByTagName("tr");
            for (var i = 1; i &lt; trs.length; i++) {
              var td = trs[i].getElementsByTagName("td")[0];
              if (td) {
                var text = td.textContent || td.innerText;
                trs[i].style.display = text.toLowerCase().indexOf(filter) &gt; -1 ? "" : "none";
              }
            }
          }
        </script>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
