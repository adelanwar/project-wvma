# Google Sheets Integration Setup

This guide explains how to connect the WVMA Calendar to a Google Sheet so you can easily update meetings without editing code.

## Quick Start

1. Create a Google Sheet with your meeting data
2. Publish the sheet to the web as CSV
3. Add the published URL to the calendar HTML file

---

## Step 1: Create Your Google Sheet

### Create a new Google Sheet with these exact column headers in Row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| **title** | **type** | **date** | **time** | **location** | **description** |

### Add your meeting data starting from Row 2:

| title | type | date | time | location | description |
|-------|------|------|------|----------|-------------|
| Monthly BOD Meeting | BOD | 2026-01-15 | 10:00 AM | Conference Room A | Regular monthly board meeting |
| Quarterly BOT Review | BOT | 2026-01-22 | 2:00 PM | Main Hall | Quarterly financial review |
| BOD Strategic Planning | BOD | 2026-02-05 | 9:00 AM | Executive Suite | Annual strategic planning |

### Important Format Requirements:

- **title**: Any text (required)
- **type**: Must be `BOD` or `BOT` (required)
- **date**: Must be in `YYYY-MM-DD` format, e.g., `2026-01-15` (required)
- **time**: Any text, e.g., `10:00 AM` or `14:00` (optional)
- **location**: Any text (optional)
- **description**: Any text (optional)

---

## Step 2: Publish Your Sheet to the Web

1. Open your Google Sheet
2. Go to **File** > **Share** > **Publish to web**
3. In the dialog that appears:
   - Under "Link", select your sheet name (e.g., "Sheet1")
   - Change format from "Web page" to **"Comma-separated values (.csv)"**
4. Click **Publish**
5. Copy the URL that appears (it will look like):
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-xxxxx/pub?gid=0&single=true&output=csv
   ```

---

## Step 3: Add the URL to Your Calendar

Open `wvma-calendar.html` and find this line near the top of the `<script>` section:

```javascript
const GOOGLE_SHEETS_URL = ''; // Leave empty to use sample data
```

Replace it with your published URL:

```javascript
const GOOGLE_SHEETS_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-xxxxx/pub?gid=0&single=true&output=csv';
```

Save the file and refresh your browser. The calendar will now load meetings from your Google Sheet.

---

## Updating Meetings

Once connected:

1. Open your Google Sheet
2. Add, edit, or delete meeting rows
3. Changes appear in the calendar within a few minutes (Google caches published sheets)

**Note:** The "Add Meeting" and "Edit" buttons in the calendar only update the local view. To permanently save changes, update the Google Sheet directly.

---

## Example Google Sheet

Here's a complete example of how your sheet should look:

| title | type | date | time | location | description |
|-------|------|------|------|----------|-------------|
| January BOD Meeting | BOD | 2026-01-08 | 10:00 AM | Room 101 | Monthly operations review |
| BOT Financial Review | BOT | 2026-01-15 | 2:00 PM | Board Room | Q4 financial statements |
| Special BOD Session | BOD | 2026-01-22 | 9:00 AM | Room 101 | Budget planning for Q1 |
| BOT Annual Meeting | BOT | 2026-01-29 | 1:00 PM | Main Hall | Annual trustee gathering |
| February BOD Meeting | BOD | 2026-02-12 | 10:00 AM | Room 101 | Monthly operations review |
| BOT Strategic Review | BOT | 2026-02-19 | 2:00 PM | Board Room | Strategic initiatives update |

---

## Troubleshooting

### Calendar shows sample data instead of my sheet
- Make sure you published as CSV (not "Web page")
- Check that the URL ends with `output=csv`
- Verify the sheet is publicly accessible

### Dates aren't showing correctly
- Use `YYYY-MM-DD` format (e.g., `2026-01-15`)
- Don't use formats like `1/15/2026` or `January 15, 2026`

### Some meetings are missing
- Ensure each row has at least a title and date
- Check that type is either `BOD` or `BOT` (case insensitive)

### CORS errors in browser console
- Make sure you're using the "Publish to web" feature, not just sharing the sheet
- The URL should contain `/pub?` not `/edit?`

### Changes not appearing
- Google caches published sheets for up to 5 minutes
- Try adding `&t=` followed by the current timestamp to force refresh:
  ```javascript
  const GOOGLE_SHEETS_URL = 'https://docs.google.com/.../pub?output=csv&t=' + Date.now();
  ```

---

## Advanced: Auto-Refresh

To automatically refresh the calendar data every 5 minutes, add this code before the closing `</script>` tag:

```javascript
// Auto-refresh every 5 minutes
setInterval(() => {
  loadMeetings();
}, 5 * 60 * 1000);
```

---

## Security Notes

- Published Google Sheets are publicly readable (anyone with the URL can view)
- Don't include sensitive information in your meeting descriptions
- The calendar runs entirely in the browser - no server required
- Meeting edits made in the calendar UI are temporary (local only)
