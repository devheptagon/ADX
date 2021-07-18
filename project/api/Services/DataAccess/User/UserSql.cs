
using System;
using System.Collections.Generic;
using System.Text;
using System.Collections;

class UserSqlStrings
{
    public static string SelectSql = @"SELECT * FROM [User] AS A";

    public static string SelectByCredsSql = "SELECT TOP 1 * FROM [User] WHERE [email]=@email AND passhash=@passhash";

    public static string SelectByIdSql = SelectSql + " WHERE CAST(A.id AS VARCHAR(50)) = @user_id";

    public static string AddSql = @"Insert Into [User] (fullname, [role], email, passhash) VALUES(@fullname, @role, @email, @passhash); select CONVERT(varchar(50),scope_identity())";

    public static string DeleteSql = "Delete From [User] Where id = @user_id";

    public static string UpdateSql = @"Update [User] Set fullname=@fullname, [role]=@role, email=@email, passhash=@passhash WHERE id = @id";
}

