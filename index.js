const express = require("express");
const { marked } = require("marked");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Root route for the homepage
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Markdown Converter API. Use POST /convert to convert Markdown to HTML."
  );
});

// Route to handle Markdown conversion
app.post("/convert", (req, res) => {
  const markdownText = req.body.markdown;

  // Log the incoming Markdown text for debugging
  console.log("Received Markdown:", markdownText);

  if (!markdownText) {
    return res.status(400).send({ error: "No Markdown content provided" });
  }

  try {
    // Convert Markdown to HTML using marked
    const htmlOutput = marked(markdownText);
    console.log("HTML Output:", htmlOutput); // Log the HTML output for debugging
    res.json({ html: htmlOutput });
  } catch (error) {
    console.error("Markdown conversion error:", error);
    res.status(500).send({ error: "Failed to convert Markdown" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Markdown conversion server running at http://localhost:${port}`);
});
