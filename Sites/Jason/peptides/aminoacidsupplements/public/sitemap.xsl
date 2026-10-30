<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title>XML Sitemap | Peptides UK British Laboratory Index</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
          }
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #f8fafc;
            color: #0f172a;
            line-height: 1.5;
            padding: 24px;
          }
          .container {
            max-width: 1200px;
            margin: 0 auto;
          }
          .header {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            padding: 32px;
            margin-bottom: 24px;
            box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.05);
          }
          .badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #ecfdf5;
            color: #059669;
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 9999px;
            padding: 4px 12px;
            font-size: 11px;
            font-family: monospace;
            text-transform: uppercase;
            font-weight: 700;
            margin-bottom: 12px;
          }
          h1 {
            color: #0f172a;
            font-size: 28px;
            font-weight: 800;
            margin-bottom: 8px;
            letter-spacing: -0.02em;
          }
          p.lead {
            color: #475569;
            font-size: 14px;
            max-width: 800px;
            margin-bottom: 16px;
          }
          .meta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding-top: 16px;
            border-top: 1px solid #f1f5f9;
            font-size: 13px;
            font-family: monospace;
          }
          .meta-item {
            color: #64748b;
          }
          .meta-item strong {
            color: #059669;
          }
          .filter-box {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px 20px;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 1px 3px 0 rgba(15, 23, 42, 0.03);
          }
          .filter-box input {
            flex: 1;
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            padding: 10px 14px;
            color: #0f172a;
            font-size: 14px;
            font-family: monospace;
            outline: none;
          }
          .filter-box input:focus {
            border-color: #059669;
            background: #ffffff;
          }
          .table-wrap {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.05);
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          thead {
            background: #f8fafc;
            border-bottom: 1px solid #e2e8f0;
          }
          th {
            text-align: left;
            padding: 14px 18px;
            color: #475569;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.05em;
          }
          td {
            padding: 14px 18px;
            border-bottom: 1px solid #f1f5f9;
          }
          tr:hover td {
            background-color: #f0fdf4;
          }
          a {
            color: #059669;
            text-decoration: none;
            word-break: break-all;
            font-weight: 600;
          }
          a:hover {
            color: #047857;
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
            background: #ecfdf5;
            color: #059669;
            border: 1px solid rgba(5, 150, 105, 0.3);
          }
          .pill-prio-med {
            background: #eff6ff;
            color: #1d4ed8;
            border: 1px solid rgba(29, 78, 216, 0.3);
          }
          .pill-prio-low {
            background: #f1f5f9;
            color: #64748b;
            border: 1px solid #cbd5e1;
          }
          .freq-pill {
            background: #f1f5f9;
            color: #334155;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-family: monospace;
          }
          .date-cell {
            color: #64748b;
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
            <div class="badge">United Kingdom Clinical Laboratory Sitemap</div>
            <h1>Peptides-UK.org XML Sitemap</h1>
            <p class="lead">
              Unified XML sitemap for Peptides-UK.org indexing canonical British clinical research monographs, amino acid sequencing data, verified UK supplier directories, and MHRA statutory compliance trackers. Formatted according to the official Sitemaps.org protocol.
            </p>
            <div class="meta-row">
              <div class="meta-item">
                Canonical Domain: <strong>https://peptides-uk.org</strong>
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
            <!-- SITEMAP INDEX FALLBACK -->
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
                <input type="text" id="filterInput" placeholder="Filter canonical URLs by keyword (e.g. bpc-157, vendors, regulatory, category)..." onkeyup="filterTable()" />
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
            Peptides UK &#169; 2026 &#183; Clinical Laboratory Directory &#183; In Vitro Academic Research Only
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
