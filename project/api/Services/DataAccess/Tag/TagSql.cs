
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;
using adx;

class TagSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Tag] AS T ORDER BY T.title";

    public static string SelectByPageSql = @"SELECT * FROM [Tag] AS T ORDER BY T.title OFFSET(@PAGE-1) * " + Constants.PAGE_SIZE + " ROWS FETCH NEXT " + Constants.PAGE_SIZE + " ROWS ONLY";

    public static string SelectByIdSql = "SELECT * FROM [Tag] AS T WHERE CAST(T.id AS VARCHAR(50)) = @tag_id";

    public static string AddSql = @"Insert Into [Tag] (title) VALUES(@title); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Tag] Where id = @tag_id";

    public static string UpdateSql = @"Update [Tag] Set title=@title WHERE id = @id";
}

