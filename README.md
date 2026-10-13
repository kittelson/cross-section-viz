# cross-section-viz

Comparing street cross sections using [NCHRP 1036](https://www.nationalacademies.org/publications/26788) and [Streetmix](https://streetmix.net)

Originally prepared for MassDOT in late 2026/early 2027, this front end React, TypeScript, Vite app builds off the spreadsheet created in research project NCHRP 1036 to create a web interface that uses [Streetmix](https://streetmix.net) to help people visualize roadway cross sections. This web tool enables people to apply the NCHRP 1036 research to their streetmix cross section.

Features of the application will include:

- Manually input existing cross section using Streetmix
- Enter project information and goals
- Outputs minimum safe dimension using Streetmix
- View global and lane-specific suggested cross section edits
- Build multiple cross section alternatives, navigate between them
- Embed UI elements that explain why street elements drive certain outcomes
- View impacts on project goals
- View impacts on traffic operations
- Save progress automatically on user’s local machine
- Download analysis to file/Upload analysis file to view progress
- Share analysis file with others
- Form validation preventing users from entering nonsensical data
