using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace adx.Services
{
    public class Logger
    {
        public static void LogError(string message)
        {
            using (StreamWriter writer = new StreamWriter("log.txt", true))
            {
                try
                {
                    writer.WriteLine(DateTime.Now.ToString());
                    writer.Write(message);
                    writer.Close();
                }
                catch { }
            }
        }
    }
}
