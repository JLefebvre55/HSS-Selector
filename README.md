# HSS Selector
Selects an appropriate square steel Hollow Structural Section member given length, force, and factor of safety requirements.

## Background

Hollow Structural Sections [(Wikipedia)](https://en.wikipedia.org/wiki/Hollow_structural_section) are metal - often steel - structural members with a hollow cross section.

They are analyzed _extensively_ in University of Toronto's Engineering Science [CIV102 course](https://orientation.engsci.utoronto.ca/2020/05/27/course-overview-civ-102-structures-and-materials/).

## Contributors

- Jayden Lefebvre - EngSci 2T4 - [GitHub](https://github.com/JLefebvre55)
- Aidan - EngSci 2T4
- Ryan Aldzi - EngSci 2T4

# Development

## Requirements

- Python 3.8+ [(Download)](https://www.python.org/downloads/)

## Todo

- [x] Import sample HSS selection from [reference table](./src/HSS.pdf) to [CSV](./src/hss-v1.csv).
- [x] Write a [Python script](./src/hss-refactor.py) that exports this data as a [JSON](./src/hss-v1.json), keyed by member designation.
- [x] Write script that finds the __lightest__ HSS member that will satisfy length, force, and FOS requirements.
- [ ] Test and improve script.
- [ ] Import __all__ HSS members from table to CSV, recompute JSON.
- [ ] Write frontend.