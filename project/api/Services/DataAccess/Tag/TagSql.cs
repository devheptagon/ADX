
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class TagSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [Tag] AS A";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(A.id AS VARCHAR(50)) = @tag_id";

    public static string AddSql = @"Insert Into [Tag] (title) VALUES(@title); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [Tag] Where id = @tag_id";

    public static string UpdateSql = @"Update [Tag] Set title=@title WHERE id = @id";
}

