
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class AreaSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Area] AS A";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(A.id AS VARCHAR(50)) = @area_id";

    public static string AddSql = @"Insert Into [Area] (title) VALUES(@title); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Area] Where id = @area_id";

    public static string UpdateSql = @"Update [Area] Set title=@title WHERE id = @id";
}

