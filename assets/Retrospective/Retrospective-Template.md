# TEMPLATE FOR RETROSPECTIVE (Team ##)

The retrospective should include _at least_ the following
sections:

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES

### Macro statistics

- Number of stories committed vs. done: 3/3
- Total points committed vs. done: 7/7
- Nr of hours planned vs. spent (as a team): 119h 30m / 112h 18m

**Remember**a story is done ONLY if it fits the Definition of Done:

- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed

> Please refine your DoD if required (you cannot remove items!)

### Detailed statistics

| Story         | # Tasks | Points | Hours est. | Hours actual |
| ------------- | ------- | ------ | ---------- | ------------ |
| _#0_          | 4       |        | 1d 2h      | 1d 2h 30m    |
| get ticket    | 14      | 5      | 1w 2h 30m  | 1w 4h 10m    |
| next customer | 15      | 1      | 1w 5h      | 4d 45m       |
| call customer | 12      | 1      | 2d 6h      | 2d 5h 33m    |

> story `#0` is for technical tasks, leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)

| Story         | hours per task avg EST | hour per task avg ACT | standard dev EST | standard dev ACT |
| ------------- | ---------------------- | --------------------- | ---------------- | ---------------- |
| _#0_          | 2h 30m                 | 2h 38m                | 3h 0m            | 2h 56m           |
| get ticket    | 3h 2m                  | 3h 9m                 | 2h 26m           | 2h 16m           |
| next customer | 3h 0m                  | 2h 11m                | 2h 29m           | 1h 56m           |
| call customer | 1h 50m                 | 1h 48m                | 1h 8m            | 1h 0m            |

- Total estimation error ratio: sum of total hours spent / sum of total hours effort - 1

  $$\frac{\sum_i spent_{task_i}}{\sum_i estimation_{task_i}} - 1$$

  = (112h 18min)/(119h 30m) - 1 = -0.06

- Absolute relative task estimation error: sum( abs( spent-task-i / estimation-task-i - 1))/n

  $$\frac{1}{n}\sum_i^n \left| \frac{spent_{task_i}}{estimation_task_i}-1 \right| $$

  = 0.329

## QUALITY MEASURES

- Unit Testing:
  - Total hours estimated: 20
  - Total hours spent: 13
  - Nr of automated unit test cases: 12
  - Coverage (if available): 78.24% Statements | 16.66% Branches  | 78.12% Functions | 82.08% Lines
- E2E testing:
  - Total hours estimated
  - Total hours spent
- Code review
  - Total hours estimated: 12
  - Total hours spent: 9

## ASSESSMENT

- What caused your errors in estimation (if any)?
  Not being familiar with other team member skills.

- What lessons did you learn (both positive and negative) in this sprint?
  (-) We have to communicate and collaborate more effectively.
  (+) Design the DB schema before design the mockups.
  (-) Assign a task to only one person

- Which improvement goals set in the previous retrospective were you able to achieve?
- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > Define a plan (in details) as soon as the project starts
  > Teamwork improvement and sharing the task

- One thing you are proud of as a Team!!
  We are proud of the project we made until now
