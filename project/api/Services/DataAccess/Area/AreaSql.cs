
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class AreaSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Area] AS T ORDER BY T.title";

    public static string SelectByPageSql = @"SELECT * FROM [Area] AS T ORDER BY T.title OFFSET(@PAGE-1) * " + Constants.PAGE_SIZE + " ROWS FETCH NEXT " + Constants.PAGE_SIZE + " ROWS ONLY";

    public static string SelectByIdSql = "SELECT * FROM [Area] AS T WHERE CAST(T.id AS VARCHAR(50)) = @area_id";

    public static string AddSql = @"Insert Into [Area] (title) VALUES(@title); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Area] Where id = @area_id";

    public static string UpdateSql = @"Update [Area] Set title=@title WHERE id = @id";
}

