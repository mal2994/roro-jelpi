poke(0x5f2d,3)cursor()pal()clip()function dadd(n,v,i,p)add(lines,{n=n,v=v,x=type(v)=="table"and"+"or" ",i=i},p) end function dexp(l,p)if l.x=="+" then for n,v in pairs(l.v) do p+=1 dadd(n,v,l.i.." ",p)end l.x="-"end end

function dinp()local x,y,b,w=stat(32),stat(33),stat(34),stat(36)line(x,y,x,y+2,10)if btnp(❎) then local i=(y-10)\6+1 local p=s+i local l=lines[p]if l and (x-10)\4==#l.i then dexp(l,p)end end s=max(min(s-stat(36),#lines-18),0)end

function dui()while true do rectfill(10,10,118,118,1)for i=1,18 do local l=lines[i+s]if l then print(l.i..l.x..tostr(l.n)..":"..tostr(l.v),10,(i-1)*6+10,7)end end dinp()flip() end end function dinsp(v)lines,s={},0 dadd("value",v,"",#lines+1)dui()end