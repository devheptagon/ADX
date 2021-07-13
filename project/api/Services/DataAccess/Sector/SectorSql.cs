
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class SectorSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Sector] AS A";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(A.id AS VARCHAR(50)) = @sector_id";

    public static string AddSql = @"Insert Into [Sector] (title) VALUES(@title); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Sector] Where id = @sector_id";

    public static string UpdateSql = @"Update [Sector] Set title=@title WHERE id = @id";
}

