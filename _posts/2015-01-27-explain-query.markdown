---
layout: post
title: EXPLAIN Query
date: '2015-01-27 08:35:46'
permalink: /EXPLAIN-Query/
---

These are some notes I made while trying to understand what `EXPLAIN QUERY` output in PostgreSQL means:

* Output of Explain
  - Tree of plan nodes
  - One line per node
     - Basic node type
     - Cost estimates
     - Additional indented lines to show additional properties of the node
  - Leaves of the tree are `scan nodes`
  - First line = total execution cost, this is minimized
  - Costs are (usually) cumulative
     - Unless the node's query finishes before sub-node's, e.g. `LIMIT`

----
* Types of `scan nodes`:
  - Sequential scans
  - Index scans
  - Bitmap index scans
  - Non-table row source
     - `VALUES` clause
     - set-returning functions in `FROM`

----
* Above scan nodes:
  - Nested Loop
       - First child is the "OUTER", Second Child is the "INNER"
       - The inner node is run for _each_ row from the outer
       - But not Materialized nodes, the data is saved in memory
    - Hash Join
      - First table in memory
      - Second table is scanned and hash probed
    - Merge Join
      - Both tables must be sorted
      - Index scans are already sorted
  - Aggregation
     - For GROUP BY
  - Sorting
     - For Merge Join and ORDER BY clauses
  - Bitmap Heap Scan
     - Works on underlying index scan
     - Sorts the rows to minimize disk page fetches
  - Other ops under the raw rows

----

* Cost estimates
  - Four numbers:
     - Start-up cost
     - Total cost
     - Number of rows output
     - Average width of rows in bytes
  - Traditionally, costs measures in number of disk page fetches needed
  - ```Cost = (disk pages read) * seq_page_cost +
                (rows scanned) * cpu_tuple_cost +
                (rows) * cpu_operator_cost + ...
      ```
           
     - `random_page_cost     = 4.0`
     - `seq_page_cost        = 1.0`
     - `cpu_tuple_cost       = 0.01`
     - `cpu_index_tuple_cost = 0.005`
     - `cpu_operator_cost    = 0.0025 (WHERE condition)`

  - Can force the optimizer to disregard certain operations
    - `enable_sort`
    - `enable_indexonlyscan`
    - etc.

----

* With `ANALYZE`:
  - Costs are in milliseconds
  - loops describes how many times the sub-plan ran
  - Some additional execution statistics may be shown as well
       - Sort method
       - Hash buckets
       - Memory usage, etc.
       - Rows removed by filters
       - Merge join can over-report actual row count
       - BitmapAnd and BitmapOr always report actual row count as zero
  - With `BUFFERS`:
      - Shows which parts are most I/O intensive
