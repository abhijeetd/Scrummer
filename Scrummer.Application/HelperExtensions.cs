﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scrummer.Application
{
    public static class HelperExtensions
    {
        public static void MergeWith<T>(this T primary, T secondary)
        {
            foreach (var pi in typeof(T).GetProperties())
            {
                var priValue = pi.GetGetMethod().Invoke(primary, null);
                var secValue = pi.GetGetMethod().Invoke(secondary, null);
                try //if (priValue == null /*|| (pi.PropertyType.IsValueType && priValue.Equals(Activator.CreateInstance(pi.PropertyType)))*/)
                {
                    pi.GetSetMethod().Invoke(primary, new object[] { secValue });
                }
                catch { }
            }
        }
    }
}
