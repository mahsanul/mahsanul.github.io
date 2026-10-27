# Website Guide: How to Edit Your Academic Website

This guide shows you how to change everything on your website by yourself.
You do not need to know how to program. You only need to edit text files.

**Your website:** https://mahsanul.github.io

---

## Contents

1. [Quick start: the 5 minute version](#1-quick-start-the-5-minute-version)
2. [How the website works](#2-how-the-website-works)
3. ["I want to change ..." table](#3-i-want-to-change--table)
4. [How to edit a file on GitHub (step by step)](#4-how-to-edit-a-file-on-github-step-by-step)
5. [Rules for the data files (YAML)](#5-rules-for-the-data-files-yaml)
6. [Common tasks](#6-common-tasks)
   - [6.1 Change my basic information](#61-change-my-basic-information)
   - [6.2 Change my photo](#62-change-my-photo)
   - [6.3 Add news](#63-add-news)
   - [6.4 Add a publication](#64-add-a-publication)
   - [6.5 Change my research topics and projects](#65-change-my-research-topics-and-projects)
   - [6.6 Update my CV (education, jobs, skills, service, awards)](#66-update-my-cv-education-jobs-skills-service-awards)
   - [6.7 Upload or update my CV PDF](#67-upload-or-update-my-cv-pdf)
   - [6.8 Update teaching](#68-update-teaching)
   - [6.9 Add a project](#69-add-a-project)
   - [6.10 Add a talk or poster](#610-add-a-talk-or-poster)
   - [6.11 Write a note (blog post)](#611-write-a-note-blog-post)
   - [6.12 Upload files and images](#612-upload-files-and-images)
   - [6.13 Add, remove, or reorder the menu tabs](#613-add-remove-or-reorder-the-menu-tabs)
   - [6.14 Add a new page](#614-add-a-new-page)
   - [6.15 Change the home page sections](#615-change-the-home-page-sections)
   - [6.16 Change colors and fonts](#616-change-colors-and-fonts)
   - [6.17 Change or remove the concept drift figure](#617-change-or-remove-the-concept-drift-figure)
   - [6.18 Change the icon and the sharing image](#618-change-the-icon-and-the-sharing-image)
   - [6.19 Use your own domain name (optional)](#619-use-your-own-domain-name-optional)
7. [After you finish your Ph.D.: update checklist](#7-after-you-finish-your-phd-update-checklist)
8. [Check that your change worked](#8-check-that-your-change-worked)
9. [Fix problems](#9-fix-problems)
10. [Preview on your own computer (optional)](#10-preview-on-your-own-computer-optional)
11. [Safety and privacy](#11-safety-and-privacy)
12. [Quick reference](#12-quick-reference)

---

## 1. Quick start: the 5 minute version

1. Go to your repository on GitHub: `https://github.com/mahsanul/mahsanul.github.io`
2. Open the file you want to change. For example: `_data/news.yml`
3. Click the **pencil icon** (Edit this file).
4. Change the text.
5. Click the green **Commit changes...** button. Then click **Commit changes** again.
6. Wait 1 to 3 minutes. Then open your website and refresh the page.

That is all. Every change on the website works like this.

> **A mistake cannot break your live website.** If a change has an error, GitHub
> shows a red mark and keeps the old website online. You can fix the error and
> commit again. See [Fix problems](#9-fix-problems).

---

## 2. How the website works

Your website is made with **Jekyll**. Jekyll is a free tool that GitHub runs for you.

- You write your information in simple text files.
- GitHub reads the files and creates the web pages. This is called a **build**.
- GitHub then publishes the pages at `https://mahsanul.github.io`.
- A build starts every time you commit a change to the `main` branch.
- A build usually takes 1 to 3 minutes.

There are three kinds of files:

| Kind | What it is | Where | Do you edit it? |
|---|---|---|---|
| **Data files** | Your information: news, papers, jobs, links. | `_data/` folder | **Yes. This is where you do most of your work.** |
| **Page files** | The text of each page, like the title and the short introduction. | `index.html`, `_pages/` folder | Sometimes |
| **Design files** | Layout, colors, fonts, and scripts. | `_layouts/`, `_includes/`, `assets/` | Rarely |

The most important idea: **the pages are created from the data files.** If you add a
paper to `_data/publications.yml`, it appears on the Publications page, on the CV
page, and (if you choose) on the home page. You write it one time only.

### The folders and files

```
mahsanul.github.io/
├── index.html                 Home page
├── _config.yml                Basic site settings (rarely changed)
├── WEBSITE_GUIDE.md           This guide
├── README.md                  Short description of the repository
│
├── _data/                     YOUR INFORMATION (edit these most)
│   ├── profile.yml            Name, photo, bio, links, email, headline
│   ├── news.yml               News list
│   ├── publications.yml       Papers and preprints
│   ├── research.yml           Research areas and research projects
│   ├── experience.yml         Jobs (CV)
│   ├── education.yml          Degrees (CV)
│   ├── skills.yml             Skills (CV)
│   ├── service.yml            Reviewing and service (CV, home page)
│   ├── honors.yml             Awards (CV)
│   ├── teaching.yml           Teaching page
│   ├── projects.yml           Projects page
│   ├── talks.yml              Talks page (tab is hidden when empty)
│   └── navigation.yml         The menu at the top
│
├── _pages/                    Page files: research, publications, teaching, ...
├── _posts/                    Notes (blog posts). You create this folder at your first note.
├── files/                     PDF files: your CV, slides, posters
├── images/                    Photos, icons, and the sharing image
│
├── _layouts/ and _includes/   Page design (rarely edited)
└── assets/
    ├── css/site.css           Colors, fonts, and styles
    ├── js/site.js             Small scripts (menu, dark mode, filters)
    ├── js/drift.js            The concept drift figure on the home page
    └── fonts/                 Font files
```

Files and folders that start with `_` are special. Jekyll reads them but does not
publish them directly. This is normal.

---

## 3. "I want to change ..." table

Use this table to find the right file fast.

| I want to change ... | Edit this file |
|---|---|
| My name, role, university, location | `_data/profile.yml` |
| The big headline and the short text under it | `_data/profile.yml` (`headline`, `lead`) |
| The "About" text on the home page | `_data/profile.yml` (`bio`) |
| The "Currently" box on the home page | `_data/profile.yml` (`now`) |
| My email address | `_data/profile.yml` (`email`) |
| Links to Google Scholar, ORCID, GitHub, LinkedIn | `_data/profile.yml` (`links`) |
| The four facts under the headline | `_data/profile.yml` (`facts`) |
| My photo | upload to `images/`, then `_data/profile.yml` (`photo`) |
| News | `_data/news.yml` |
| Publications | `_data/publications.yml` |
| Research areas, research projects | `_data/research.yml` |
| Education, jobs, skills, awards, service | `_data/education.yml`, `experience.yml`, `skills.yml`, `honors.yml`, `service.yml` |
| Teaching | `_data/teaching.yml` |
| Projects | `_data/projects.yml` |
| Talks and posters | `_data/talks.yml` |
| The menu at the top | `_data/navigation.yml` |
| The intro sentence of a page | the page file in `_pages/` (the `lead:` line) |
| The CV PDF to download | upload to `files/` |
| Colors and fonts | `assets/css/site.css` (top of the file) |
| A new blog post (note) | new file in `_posts/` |
| A new page | new file in `_pages/` |

---

## 4. How to edit a file on GitHub (step by step)

You can do all changes in your web browser. You do not need to install anything.

### Edit an existing file

1. Open `https://github.com/mahsanul/mahsanul.github.io`.
2. Click the folder name (for example `_data`), then click the file (for example `news.yml`).
3. Click the **pencil icon** at the top right of the file. (Its name is "Edit this file".)
4. Make your change in the text box.
5. Click the green **Commit changes...** button.
6. In the box that opens:
   - Write a short message, for example `Add new paper to news`.
   - Choose **Commit directly to the main branch**.
   - Click **Commit changes**.
7. Wait 1 to 3 minutes and refresh your website.

> Tip: After the website updates, press **Ctrl + Shift + R** (Windows) or
> **Cmd + Shift + R** (Mac) to refresh without old saved data.

### Create a new file

1. Open the folder where the file should be.
2. Click **Add file**, then **Create new file**.
3. Type the file name at the top. To create a folder, type its name and a slash, for example `_posts/2027-03-15-my-note.md`.
4. Write the content.
5. Click **Commit changes...** and commit.

### Upload a file (PDF, image)

1. Open the folder where the file should be (for example `files`).
2. Click **Add file**, then **Upload files**.
3. Drag your file into the page, or choose it from your computer.
4. Click **Commit changes**.

### Delete a file

1. Open the file.
2. Click the **three dots** at the top right, then **Delete file**.
3. Click **Commit changes**.

### Go back to an older version (undo)

GitHub remembers every version of every file.

1. Open the file and click **History** (top right).
2. Click the commit from before your mistake.
3. Click the **three dots**, then **View file**. You now see the old text.
4. Copy the old text. Open the current file in the editor, replace its text with the old text, and commit.

---

## 5. Rules for the data files (YAML)

Files in `_data/` end with `.yml`. They use a format called **YAML**. The rules are short.

**Rule 1: Spaces matter.** Use spaces at the start of lines. Never use the Tab key. Use 2 spaces for each level.

**Rule 2: A list item starts with a dash and a space.**

```yaml
- date: "2027"
  text: "First news."
- date: "2026"
  text: "Second news."
```

Each `-` starts one item. The lines under it that are moved 2 spaces to the right belong to that item.

**Rule 3: Use quotes around text.** Always put text inside double quotes `"like this"`.
This is required when the text has a colon `:`, a hash `#`, or starts with a special
character. If you need a double quote inside the text, write a backslash before it: `"He said \"hello\""`.

**Rule 4: Lines that start with `#` are comments.** The website ignores them. They are notes for you.

**Rule 5: Long text on many lines** uses `|`:

```yaml
bio: |
  First paragraph of the text.

  Second paragraph of the text.
```

**Rule 6: Lists inside an item.**

```yaml
authors:
  - Md Ahsanul Haque
  - Second Author
```

**Rule 7: Keep the same spaces when you copy.** The best way to add a new item is to copy an
existing item, paste it, and change only the words.

### Markdown

Some fields can use **Markdown**. This is a simple way to format text.

| You type | You get |
|---|---|
| `**bold**` | **bold** |
| `*italic*` | *italic* |
| `[Google](https://google.com)` | a link |

Markdown works in these places only: `bio`, `headline` (only `*stars*` for the highlighted word),
`news` text, the `intro` of `research.yml`, and the `bullets` in `experience.yml`.
In all other fields, write plain text.

---

## 6. Common tasks

### 6.1 Change my basic information

**File:** `_data/profile.yml`

Open it. Every line has a short comment that explains it. The important fields:

| Field | What it controls |
|---|---|
| `name` | Your name (header, footer, page titles, and the bold name in author lists) |
| `role` | Your role, for example `Ph.D. Student in Computer Science` |
| `affiliation`, `affiliation_url` | Your university name and its website |
| `location` | City and country |
| `kicker` | The small red line above the headline |
| `headline` | The big sentence on the home page. Put `*stars*` around one word to highlight it. |
| `lead` | The short text under the headline |
| `bio` | The "About" section (Markdown, many paragraphs) |
| `now` | The "Currently" list on the home page. Update it often. |
| `interests` | The small tags in the "About" section |
| `facts` | The facts under the headline (value and label) |
| `email` | Your email address. It is hidden from simple spam robots. |
| `links` | Your Google Scholar, ORCID, GitHub, and LinkedIn links |
| `cv_summary` | The short summary at the top of the CV page |
| `contact_text` | The text in the dark contact box at the bottom of the home page |

**Name matching rule:** In the publication list, your name is made bold by comparing it with
`name` in this file. Write your name in `publications.yml` exactly the same way as `name` here.
If you publish with a different spelling, you can change `name` or use the same spelling in all papers.

**Add a link (for example, a new profile):**

```yaml
links:
  - label: "Google Scholar"
    url: "https://scholar.google.com/citations?user=..."
    icon: "scholar"
  - label: "DBLP"
    url: "https://dblp.org/pid/..."
    icon: "dblp"
```

The allowed `icon` names are listed in [Quick reference](#12-quick-reference).

### 6.2 Change my photo

1. Prepare a photo. Best size: **800 pixels wide and 1000 pixels high** (4 by 5, portrait). Use a JPG file under 200 KB. The face should be in the upper middle.
2. Also prepare a small copy that is **480 by 600 pixels**.
3. Upload both files to the `images/` folder (see [6.12](#612-upload-files-and-images)).
4. Open `_data/profile.yml` and change these lines to your new file names:

```yaml
photo: "/images/my-new-photo-800.jpg"
photo_small: "/images/my-new-photo-480.jpg"
photo_alt: "Portrait of Md Ahsanul Haque"
```

The original large photo (`images/photo_passport.jpg`) is kept only as a backup. The website uses the smaller copies, so pages load fast.

If you only have one image, use the same file in both lines.

### 6.3 Add news

**File:** `_data/news.yml`

Copy one block, paste it at the **top** of the list (newest first), and change the words:

```yaml
- date: "Mar 2027"
  text: "Our paper **NEWNAME** is accepted at **CONFERENCE 2027**."
  link: "/publications/#haque2027newpaper"
```

- `date` is free text.
- `text` can use Markdown (`**bold**`).
- `link` is optional. It adds a "Read more" link. Use `/publications/#` followed by the paper `id` to jump to a paper.
- The home page shows the **first 5** items. Older items stay in the file.

### 6.4 Add a publication

**File:** `_data/publications.yml`

This one entry appears on the Publications page, on the CV page, and on the home page (if `selected: true`). BibTeX is created automatically.

**Step by step:**

1. Open `_data/publications.yml` and click the pencil icon.
2. Scroll to the first paper. Click at the very start of the line `- id: ...` of the first paper.
3. Paste the template below, then change the words. Leave one empty line between papers.

**Template (copy this):**

```yaml
- id: haque2027shortname
  title: "Full title of the paper"
  authors:
    - Md Ahsanul Haque
    - Second Author
    - Third Author
  year: 2027
  type: conference
  venue: "Full name of the conference or journal"
  venue_short: "VENUE 2027"
  status: "To appear"
  selected: true
  summary: "One or two simple sentences about the paper."
  abstract: "Paste the abstract here."
  links:
    paper: "https://..."
    arxiv: "https://arxiv.org/abs/..."
    code: "https://github.com/..."
    data: "https://..."
    project: "https://..."
    slides: "/files/my-slides.pdf"
    poster: "/files/my-poster.pdf"
    video: "https://..."
    scholar: "https://scholar.google.com/..."
```

**What each field means:**

| Field | Meaning |
|---|---|
| `id` | A short unique name with no spaces. Use `lastname` + `year` + `word`. It is also the BibTeX key. |
| `title` | The full title. Keep the quotes. |
| `authors` | One name per line, in the right order. Your name is bold automatically. |
| `year` | Four digit year. Papers are sorted by year. |
| `type` | Exactly one of: `conference`, `journal`, `preprint`. (Use `conference` for workshop papers.) |
| `venue` | The full name of the conference or journal. |
| `venue_short` | The short text in the red stamp, for example `ICLR 2027`. |
| `volume`, `number`, `pages` | Optional. For journals. Example: `volume: 14`, `number: 7`, `pages: "10-20"` |
| `status` | Optional. A small note, for example `To appear`, `Under review`, `Under revision for ICSE`. **Remove the line** when it is no longer true. |
| `selected` | `true` shows the paper in "Selected publications" on the home page. `false` hides it there. |
| `summary` | Optional. Plain text, one or two sentences. |
| `abstract` | Optional. Adds an "Abstract" button on the Publications page. |
| `links` | Optional buttons. **Delete the lines you do not have.** If a link starts with `/`, it is a file on your website. |
| `bibtex` | Optional. Only if you want your own BibTeX text. Normally leave it out. |

**Good to know**

- **Many authors:** just add more `- Name` lines.
- **Paper PDF on your own site:** upload it to `files/` and write `paper: "/files/my-paper.pdf"`.
- **Preprint becomes published:** change `type` to `conference` or `journal`, update `venue`, `venue_short`, `year`, and delete the `status` line. Keep the same `id`, so old links still work.
- **Order:** the website sorts papers by `year`. Inside the same year, the order in the file is used.
- **Remove a paper:** delete the whole block, from `- id:` to its last line.
- **Special characters:** if a title has a colon or quotes, keep it inside double quotes. A double quote inside the title needs a backslash: `\"`.

After you add the paper, you can also add a line to `news.yml` (see [6.3](#63-add-news)).

### 6.5 Change my research topics and projects

**File:** `_data/research.yml`

It has four parts:

- `intro`: the first paragraph on the Research page (Markdown allowed).
- `themes`: your research areas. Each has `title`, `summary` (short; shown on the home page), and `details` (longer; shown on the Research page). The home page shows all themes, so keep the number between 3 and 6.
- `projects`: bigger projects such as LAMDA and CITADEL. Each has `name`, `full_name`, `tag` (the stamp), `summary`, `points` (a short list), and `links` (`paper`, `arxiv`, `code`, `data`, ...). Remove the `#` from the `# code:` line and add the address when you have a code link.
- `directions`: a list of things you want to work on next.

To add a theme, copy one block that starts with `- title:` and change the words.

### 6.6 Update my CV (education, jobs, skills, service, awards)

All CV items are in `_data/`. The CV page, the home page, and the print version use them.

| What | File | Notes |
|---|---|---|
| Degrees | `education.yml` | Fields: `degree`, `school`, `start`, `end`, `gpa`. Optional: `advisor`, `thesis` (remove the `#`). |
| Jobs | `experience.yml` | Fields: `role`, `org`, `location`, `start`, `end`, `bullets`. Use `end: "Present"` for a current job. |
| Skills | `skills.yml` | Groups with a list of items. |
| Reviewing and service | `service.yml` | `featured: true` shows the item on the home page. |
| Awards | `honors.yml` | `title`, `org`, `period`, `description`. |
| Summary | `profile.yml` | `cv_summary` |
| Papers | `publications.yml` | The CV shows all papers. |

**Example: add a new job (put it at the top, newest first):**

```yaml
- role: "Research Intern"
  org: "Company Name"
  location: "City, Country"
  start: "Jun 2027"
  end: "Aug 2027"
  bullets:
    - "First thing I did. Use **bold** for important words."
    - "Second thing I did."
```

**When a date changes:** for example, when you finish your Ph.D., open `education.yml` and
change `end: "Expected Dec 2027"` to `end: "Dec 2027"`.

The CV page also works as a **print version**. Open the CV page, click **Print this page**,
and choose **Save as PDF**. The menu, footer, and buttons are hidden in the printed page.

### 6.7 Upload or update my CV PDF

1. Name your PDF file exactly `Ahsanul_Haque_CV.pdf`.
2. Upload it to the `files/` folder (see [6.12](#612-upload-files-and-images)).
3. After the next build, the **Download CV** buttons appear on the home page and the CV page.

To **update** the CV, upload a new file with the same name. GitHub asks if you want to replace the old file. Confirm.

To use another file name, change this line in `_data/profile.yml`:

```yaml
cv_file: "/files/Ahsanul_Haque_CV.pdf"
```

> **Privacy:** The `files/` folder is public. Before you upload, make sure your CV does not
> contain private details such as a phone number or home address. Make a "public version"
> of your CV for the website.

### 6.8 Update teaching

**File:** `_data/teaching.yml`

Each block is one teaching role: `role`, `org`, `location`, `period`, `courses`, `duties`.

- To show **course names** for your teaching assistant role at UTEP, remove the `#` in front of
  `courses:` and the line below it, and write the real course names:

```yaml
  courses:
    - "Course name one"
    - "Course name two"
```

- The courses section is hidden when `courses` is missing or empty.
- To change the sentence under the page title, open `_pages/teaching.html` and edit the `lead:` line at the top.

### 6.9 Add a project

**File:** `_data/projects.yml`

Copy one block, paste it at the top, and change the words:

```yaml
- name: "Project name"
  period: "Jan 2027 – Apr 2027"
  tech: ["Python", "PyTorch"]
  summary: "One or two simple sentences."
  links:
    code: "https://github.com/mahsanul/project-name"
```

`links` can use: `code`, `demo`, `paper`, `data` (any of the link names in the quick reference). Delete the ones you do not need.

### 6.10 Add a talk or poster

**File:** `_data/talks.yml`

The **Talks** tab is hidden now because the list is empty. When you add the first talk, the tab
appears in the menu **automatically**.

1. Open `_data/talks.yml`.
2. At the end of the file, add this (without `#` at the start of the lines):

```yaml
- title: "Title of the talk"
  event: "Name of the conference or seminar"
  date: "April 2027"
  location: "City, Country"
  type: "Poster"
  summary: "One sentence about the talk."
  links:
    slides: "/files/my-slides.pdf"
    poster: "/files/my-poster.pdf"
    video: "https://..."
```

Newest talks go first. To hide the tab again, remove all talks.

### 6.11 Write a note (blog post)

Notes are short articles. The **Notes** tab appears in the menu **automatically** after you publish
your first note. A feed link (RSS) is added too.

1. On GitHub click **Add file**, then **Create new file**.
2. In the name box type: `_posts/2027-03-15-my-first-note.md`

   The name must follow this pattern: **year-month-day-title.md**. Use small letters, numbers, and dashes. No spaces.
3. Paste this and change it:

```markdown
---
title: "What is concept drift?"
lead: "A short explanation in simple words."
tags: [machine learning, security]
---

Write your text here. Use simple Markdown.

## A heading

A paragraph with **bold** words and a [link](https://example.org).

* A list item
* Another list item

![Text that describes the image](/images/notes/my-figure.png)
```

4. Click **Commit changes**.

Notes about the file:

- The three dashes `---` at the top and the line below the front matter are required.
- `lead` and `tags` are optional.
- A note with a **future date** in the file name is not published yet. It appears in the first build that runs on or after that date. GitHub builds only when you commit a change, so make a small commit after the date to publish it.
- **Drafts:** to keep a text private for now, put it in a folder called `_drafts` (create it the same way). Jekyll does not publish files in `_drafts`. Move the file to `_posts` (and add the date to its name) when it is ready.
- **Images:** upload them to `images/notes/` and use the path in the example.
- To **delete** a note, delete its file. When the last note is deleted, the tab disappears.

### 6.12 Upload files and images

| File type | Upload to | Link to it as |
|---|---|---|
| CV, slides, posters, papers (PDF) | `files/` | `/files/name.pdf` |
| Photos, pictures | `images/` | `/images/name.jpg` |

Rules for file names:

- Use small letters, numbers, dashes, or underscores. **No spaces.** Example: `iclr-2027-poster.pdf`.
- Keep images small. A photo should be under 300 KB. Use JPG for photos and PNG for drawings.
- Write the link **exactly** like the file name, including capital letters. `/files/CV.pdf` and `/files/cv.pdf` are different.
- Everything you upload is **public**.

### 6.13 Add, remove, or reorder the menu tabs

**File:** `_data/navigation.yml`

- **Reorder:** move a block (a `- title:` line and the lines under it) up or down.
- **Hide a tab:** put a `#` at the start of each line of that block.
- **Add a tab** for a new page:

```yaml
- title: "Awards"
  url: /awards/
```

The `url` must match the `permalink` of the page (see the next section).

- The `requires: talks` and `requires: posts` lines hide the Talks and Notes tabs until you have content. Do not remove them unless you want the tabs always visible.

### 6.14 Add a new page

1. Click **Add file**, then **Create new file**.
2. Type the name `_pages/awards.md` (use your own name).
3. Paste this and change it:

```markdown
---
title: "Awards"
permalink: /awards/
lead: "One sentence under the title."
---
<div class="prose" markdown="1">

## First heading

Text of the page. Use **bold**, *italic*, and [links](https://example.org).

* A list item
* Another list item

</div>
```

4. Commit. The page is at `https://mahsanul.github.io/awards/`.
5. Add the page to the menu (see [6.13](#613-add-remove-or-reorder-the-menu-tabs)).

The `<div class="prose" markdown="1">` line and the `</div>` line make the text look good. Keep them.

### 6.15 Change the home page sections

**File:** `index.html`

The file has clear comments such as `<!-- ============ About ============ -->`. Each section
starts at its comment and ends at its `</section>` line.

- **Remove a section:** delete everything from its comment to its `</section>` line.
- **Move a section:** cut the same block and paste it somewhere else.
- **Section numbers** (`01`, `02`, ...) are written in the file. After you move or remove a section, change the numbers by hand.
- The section names are in the `<h2 class="section__title">` lines.

Be careful to keep every `<section>` together with its `</section>`.

### 6.16 Change colors and fonts

**File:** `assets/css/site.css`

At the top of the file there is a block called **BRAND COLORS**. Change the values there.
All pages update. (Colors are written like `#B33712`. This is called a hex code.)

The current look is a clean near-white page with vermilion (red-orange) as the main color and teal as the second color.

#### Change the page background (white, cool white, or cream)

In the same block there are five lines under **PAGE BACKGROUND**. Replace them with one of
these sets. All sets were checked for good contrast.

**Cool white (current)**

```css
  --brand-page-light: #FAFBFC;
  --brand-card-light: #FFFFFF;
  --brand-panel-light: #F0F2F5;
  --brand-line-light: #E2E6EB;
  --brand-line-strong-light: #BFC6CF;
```

**Pure white**

```css
  --brand-page-light: #FFFFFF;
  --brand-card-light: #FFFFFF;
  --brand-panel-light: #F4F5F7;
  --brand-line-light: #E5E7EB;
  --brand-line-strong-light: #C2C8D0;
```

**Warm cream (the first version of the site)**

```css
  --brand-page-light: #F6F1E7;
  --brand-card-light: #FBF8F1;
  --brand-panel-light: #EDE6D6;
  --brand-line-light: #D9D0BD;
  --brand-line-strong-light: #B3A78F;
```

#### Change the main colors

Here are three other color sets for the main colors. They were checked for good contrast. To use one, replace
the matching lines in the BRAND COLORS block (the lines that start with `--brand-accent` and `--brand-second`) with the lines below.

**Ultramarine blue and ochre**

```css
  --brand-accent-light: #2848A8;
  --brand-accent-light-hover: #1D3680;
  --brand-accent-light-soft: #DCE3F5;
  --brand-accent-light-text: #FFFFFF;
  --brand-accent-dark: #8FA8FF;
  --brand-accent-dark-hover: #B7C6FF;
  --brand-accent-dark-soft: #1B2447;
  --brand-accent-dark-text: #0D1330;
  --brand-second-light: #8A5300;
  --brand-second-light-soft: #F1E2C2;
  --brand-second-dark: #E8B04B;
  --brand-second-dark-soft: #3A2A0C;
```

**Forest green and rose**

```css
  --brand-accent-light: #1B6B3A;
  --brand-accent-light-hover: #14522C;
  --brand-accent-light-soft: #D6E9DC;
  --brand-accent-light-text: #FFFFFF;
  --brand-accent-dark: #6FD497;
  --brand-accent-dark-hover: #9BE4B7;
  --brand-accent-dark-soft: #14301F;
  --brand-accent-dark-text: #06180D;
  --brand-second-light: #A02A55;
  --brand-second-light-soft: #F3D9E2;
  --brand-second-dark: #F08AAE;
  --brand-second-dark-soft: #3A1626;
```

**Plum and teal**

```css
  --brand-accent-light: #7B2D6E;
  --brand-accent-light-hover: #5F2155;
  --brand-accent-light-soft: #EBDAE7;
  --brand-accent-light-text: #FFFFFF;
  --brand-accent-dark: #E59AD6;
  --brand-accent-dark-hover: #F0BDE6;
  --brand-accent-dark-soft: #341A30;
  --brand-accent-dark-text: #1E0E1B;
  --brand-second-light: #0E5A5F;
  --brand-second-light-soft: #D3E5E1;
  --brand-second-dark: #5CC9C1;
  --brand-second-dark-soft: #143B3C;
```

**Rule for your own colors:** the main color must be dark enough to read as text on the
light page color, and the dark-theme color must be light enough to read on the dark
background. Text in small sizes needs a contrast ratio of at least 4.5. You can test two colors
for free at <https://webaim.org/resources/contrastchecker/>.

**Other things in the same block:**

- The text colors (`--ink`, `--ink-soft`, `--ink-faint`) are just below the BRAND COLORS block, in the part called "Light theme". Dark gray text on a white page is easy to read. Do not make the text lighter than `#586070`.
- The color of the browser bar on phones is set by `theme-color` in `_includes/head.html` and in `manifest.webmanifest`. It is optional. If you change the page background, you can change it there too.
- **Fonts:** the site uses *Fraunces* (headings), *IBM Plex Sans* (text), and *IBM Plex Mono* (small labels). The font files are in `assets/fonts/`, so the site does not load fonts from other websites. To use a different font, upload its `.woff2` file to `assets/fonts/`, add a `@font-face` line like the existing ones at the top of `site.css`, and change `--serif`, `--sans`, or `--mono`.
- **Dark mode:** the site follows the visitor's system setting. There is a sun/moon button in the header. The dark colors are the `-dark` values.

### 6.17 Change or remove the concept drift figure

The interactive picture on the home page ("Figure 1") is made by `assets/js/drift.js`.
It shows made-up data. A static model loses accuracy as the data rotates. An adaptive model stays accurate.

- **Change the picture:** open `assets/js/drift.js`. At the top there is a **Settings** block with numbers (`PER_CLASS`, `DIST`, `SPREAD`, `MAX_ANGLE`, `DURATION`, `SEED`). Change one number at a time. Change `SEED` to get a different random picture.
- **Change the caption or labels:** edit `_includes/drift-figure.html`.
- **Remove the figure:** open `index.html` and delete the line `{% include drift-figure.html %}` (and the comment line above it).

### 6.18 Change the icon and the sharing image

| What | File | Size |
|---|---|---|
| Browser tab icon | `images/favicon.svg`, `images/favicon.ico` | SVG, and ICO 32 by 32 |
| Phone home-screen icons | `images/apple-touch-icon.png` (180 by 180), `images/favicon-192.png`, `images/favicon-512.png` | PNG |
| Picture shown when you share your link (Slack, LinkedIn, X, email) | `images/og-card.jpg` | **1200 by 630**, JPG |

Upload a new file with the **same name** to replace the old one. Social websites keep old
sharing pictures for a while, so a new picture may take days to appear when you share the link again.

### 6.19 Use your own domain name (optional)

For example `www.ahsanulhaque.com`. You must buy the domain from a domain seller first.

1. On GitHub open **Settings**, then **Pages**. In **Custom domain** type your domain and save.
2. At your domain seller, add the DNS records that the GitHub page tells you to add.
3. Check the box **Enforce HTTPS** when GitHub allows it.
4. Open `_config.yml` and change the `url:` line to your new address, for example `url: "https://www.ahsanulhaque.com"`.

A custom domain stays the same after your Ph.D. and after you change universities. This is a good reason to use one.

---

## 7. After you finish your Ph.D.: update checklist

The website is made to work after your Ph.D. Use this list when your status changes.
You can also use the search box at the top of the repository page on GitHub to search for
words such as `UTEP` or `Ph.D.` and find every place that needs a change.

| Step | File | What to do |
|---|---|---|
| 1 | `_data/profile.yml` | Change `role`, `affiliation`, `affiliation_url`, `location`, and `kicker` to your new position. |
| 2 | `_data/profile.yml` | Rewrite `lead`, `bio`, `cv_summary`, and `now`. Remove words such as "Ph.D. student". |
| 3 | `_data/profile.yml` | Change `email` to an address that stays valid (a university address may stop working after you leave). |
| 4 | `_data/profile.yml` | Update `facts` and `contact_text`. |
| 5 | `_data/education.yml` | Change `end: "Expected Dec 2027"` to the real date. Add your thesis title and advisor (remove the `#`). |
| 6 | `_data/experience.yml` | Change `end: "Present"` of old jobs to the real date. Add your new job at the top. |
| 7 | `_data/teaching.yml` | Update the teaching roles. |
| 8 | `_data/news.yml` | Add news, for example "I defended my dissertation". |
| 9 | `_data/research.yml` | Update `intro`, `themes`, and `directions`. |
| 10 | `_config.yml` | Update the `description:` line. It is the text that search engines show. |
| 11 | `_pages/*.html` | Check the `lead:` and `description:` lines at the top of each page. Some mention UTEP. |
| 12 | `files/` | Upload your new CV PDF with the same name. |
| 13 | `images/` | Upload a new photo if you want one (see 6.2). |

---

## 8. Check that your change worked

1. **Wait 1 to 3 minutes** after you commit.
2. Open the repository on GitHub and click the **Actions** tab. Look at the top line, named
   **pages build and deployment**.
   - **Green check mark:** your change is live.
   - **Yellow circle:** the build is still running. Wait.
   - **Red cross:** there is an error. See [Fix problems](#9-fix-problems).
3. Open your website and press **Ctrl + Shift + R** (Windows) or **Cmd + Shift + R** (Mac).
4. Check the page you changed. Also look at it on a phone, or make your browser window narrow.

The first time, check **Settings → Pages**. It should say:
*Source: Deploy from a branch. Branch: main. Folder: / (root).*

---

## 9. Fix problems

| Problem | Likely reason | What to do |
|---|---|---|
| The website did not change | The build is still running, or your browser shows an old copy. | Wait 3 minutes. Press Ctrl + Shift + R. Check the **Actions** tab. |
| The **Actions** tab shows a red cross | There is a mistake in a file. | Click the red run, then click the failed step. Read the message. It names the file and the line number. Fix that file. |
| The message says `YAML Exception` or `mapping values are not allowed` | A YAML rule was broken. Most often a colon `:` inside text without quotes, or the wrong number of spaces. | Put the text in double quotes. Check that the spaces match the lines above (see [section 5](#5-rules-for-the-data-files-yaml)). Do not use the Tab key. |
| An item is missing on the page | The item is in the wrong place, or it is not lined up with the other items. | Compare it with an item that works. The `-` and the field names must start at the same position as in the other items. |
| A paper does not show on the home page | `selected` is not `true`. | Set `selected: true`. |
| The name is not bold in the author list | The name in `publications.yml` is spelled differently from `name` in `profile.yml`. | Make both the same. |
| An image or PDF shows an error (404) | The file name or the folder is wrong. | Check the name, the capital letters, and the folder. Links must start with `/`, for example `/images/photo.jpg`. |
| The Download CV button is missing | The PDF is not in `files/`, or the name is different. | Upload `files/Ahsanul_Haque_CV.pdf` or change `cv_file` in `profile.yml`. |
| The Talks tab or the Notes tab is missing | These tabs show only when there is content. | Add a talk to `talks.yml`, or a note to `_posts/`. |
| A note does not appear | The file name is wrong, or the date is in the future. | The name must be `YYYY-MM-DD-title.md`. Check the date. |
| Text shows `**stars**` instead of bold | Markdown does not work in that field. | Use plain text there (see [Markdown](#markdown)). |
| The figure on the home page is missing | JavaScript is blocked, or `drift.js` has an error. | Reload. If you edited `drift.js`, undo the change (see [undo](#go-back-to-an-older-version-undo)). |
| Everything looks wrong after a CSS change | A mistake in `site.css`. | Undo your last change to `site.css` (see [undo](#go-back-to-an-older-version-undo)). |

If you cannot find the problem, go to the file's **History**, find the last commit that worked,
and restore that version (section 4). Then make your change again in smaller steps.

---

## 10. Preview on your own computer (optional)

You do not need this. It is useful if you want to see changes before you publish them.

**Option A: Docker (easiest)**

1. Install Docker Desktop and Git.
2. Copy the repository to your computer: `git clone https://github.com/mahsanul/mahsanul.github.io.git`
3. Open a terminal in the new folder and run: `docker compose up`
4. The first start takes several minutes. When it says the server is running, open <http://localhost:4000>.
5. Edit files on your computer. Refresh the browser to see changes. Changes to `_config.yml` need a restart (press Ctrl + C, then run the command again).

**Option B: Ruby**

1. Install Ruby (version 3.2 or 3.3) and Bundler.
2. In the repository folder run: `bundle install`
3. Then run: `bundle exec jekyll serve`
4. Open <http://localhost:4000>.

To publish, commit and push your changes to the `main` branch:

```
git add .
git commit -m "Describe your change"
git push origin main
```

---

## 11. Safety and privacy

- **Your repository and website are public.** Every file in it can be read by anyone. This includes files in `files/` and `images/`.
- **Never put passwords, API keys, tokens, or other secrets** in any file in this repository. Not even in comments.
- **Do not publish** your phone number, home address, or ID documents. The email on the website is hidden from simple robots, but it is still public.
- Your CV PDF should be a **public version** (see [6.7](#67-upload-or-update-my-cv-pdf)).
- The website does not use cookies, ads, or tracking scripts. Fonts and icons are stored on your own site, so visitors do not send data to other companies when they read your pages. The only thing the site stores in a visitor's browser is the choice of light or dark theme.
- If you add Google Analytics or a similar tool in the future, add a short privacy note on the site.

---

## 12. Quick reference

### Icon names for `links` in `profile.yml`

`scholar`, `orcid`, `github`, `linkedin`, `arxiv`, `dblp`, `researchgate`, `x`, `bluesky`,
`youtube`, `mastodon`, `kaggle`, `cv`, `link` (a plain link icon for anything else).

### Link names for publications, projects, and talks

| Name | Button text |
|---|---|
| `paper` | Paper |
| `arxiv` | arXiv |
| `code` | Code |
| `data` | Data |
| `project` | Project |
| `slides` | Slides |
| `poster` | Poster |
| `video` | Video |
| `scholar` | Scholar |

### Publication types

`conference`, `journal`, `preprint`. Each has its own stamp style, and the filter buttons on the
Publications page use them.

### Where each page gets its content

| Page | Address | Content comes from |
|---|---|---|
| Home | `/` | `index.html`, `profile.yml`, `research.yml`, `publications.yml` (selected), `news.yml`, `service.yml` |
| Research | `/research/` | `research.yml` |
| Publications | `/publications/` | `publications.yml` |
| Teaching | `/teaching/` | `teaching.yml` |
| Projects | `/projects/` | `projects.yml` |
| Talks | `/talks/` | `talks.yml` |
| Notes | `/notes/` | files in `_posts/` |
| CV | `/cv/` | `profile.yml`, `education.yml`, `publications.yml`, `experience.yml`, `skills.yml`, `service.yml`, `honors.yml`, `projects.yml` |

### Old addresses that still work

`/about/` goes to the home page. `/resume/` goes to the CV. `/portfolio/` goes to Projects.

### YAML in one picture

```yaml
- id: example            # a list item starts with "- "
  title: "Text in quotes"
  authors:               # a list inside an item
    - First Author       # moved 2 spaces to the right
    - Second Author
  year: 2027             # numbers do not need quotes
  selected: true         # true or false, no quotes
  # a line with # at the start is a comment
```

### Credits

Fonts: Fraunces, IBM Plex Sans, IBM Plex Mono (SIL Open Font License). Logo icons: Font Awesome
Free and Academicons. See `assets/fonts/LICENSES.txt`. The site is built with Jekyll and hosted on GitHub Pages.
