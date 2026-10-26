# Database update
local should not extend database update (would be too much work) and it should not restrict opening a vlquery connection directly.

but when opening a connection over local:

DatabaseCluster.openLocal()
DatabaseCluster.openRemote()

it should return a database context where the pointer tables are hidden.

# Data Cohort Move
vlquery currently don't support transactions.

when moving a cohort
- the data is created on the target server
- the pointer is updated or created on the target server
- the pointer is updated on the source server
- the data is deleted on the source server

If any of this gets interrupted and incomplete

Concurrency while moving:
- Reads: no problem
- Writes: problem but out of scope for this work -> either the app itself handles it because moving data should be rare (blocking client app while transferring data) or pointers could be blockable

# Create, Update, Delete Data
## Create
Data with pointer simply gets created on current server. App should handle if for example a chat gets created between two accounts from different regions, then the app should add pointer manually.

## Update
Handles itself because its single source of truth

## Delete
Delete data with pointer on source server. Keep pointers on other servers.

# Updating Pointers
If access to remote server points to another server (n times) after final target is found update the pointer.
If the pointer points to a server that does not have a pointer the data got deleted and the current pointer can also be deleted.
