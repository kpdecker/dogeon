
%x mu emu com raw

%%

// Objects
"such" {
  return 'such';
}
"is" {
  return 'is';
}
"wow" {
  return 'wow';
}

// Arrays
"so" {
  return 'so';
}
"many" {
  return 'many';
}

// General
"next" {
  return 'next';
}

// Keywords
"notfalse" {
  return 'notfalse';
}
"nottrue" {
  return 'nottrue';
}
"nullish" {
  return 'nullish';
}

// String
'"'("\\"["]|[^"])*'"' {
  yytext = yytext.substring(1, yytext.length - 1).replace('\"', '"');
  return 'STRING';
}


// Numbers
"-"?(0|[1-9][0-9]*)(\.[0-9]+)? {
  return 'NUMBER';
}
("very"|"VERY")[+\-]?[0-9]+ {
  yytext = yytext.replace(/very/i, 'e');
  return 'EXPONENT';
}


// Ignore whitespace
\s+ {
}

<<EOF>>               return 'EOF';
