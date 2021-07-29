
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class SectorSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Sector] AS T ORDER BY T.title";

    public static string SelectByPageSql = SelectSql; //@"SELECT * FROM [Sector] AS T ORDER BY T.title OFFSET(@PAGE-1) * " + Constants.PAGE_SIZE + " ROWS FETCH NEXT " + Constants.PAGE_SIZE + " ROWS ONLY";

    public static string SelectByIdSql = "SELECT * FROM [Sector] AS T WHERE CAST(T.id AS VARCHAR(50)) = @sector_id";

    public static string AddSql = @"Insert Into [Sector] (title) VALUES(@title); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Sector] Where id = @sector_id";

    public static string UpdateSql = @"Update [Sector] Set title=@title WHERE id = @id";
}

