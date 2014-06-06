%start root

%ebnf

%{

%}

%%

root:
  value EOF {
    return $1;
  }
  ;

value
  : STRING -> $1
  | number -> $1
  | object -> $1
  | array -> $1
  | notfalse -> true
  | nottrue -> false
  | nullish -> null
  ;

object
  : such members wow -> $2
  | such wow -> {}
  ;
members
  : pair {
    var ret = {};
    ret[$1[0]] = $1[1];
    $$ = ret;
  }
  | pair next members {
    $3[$1[0]] = $1[1];
    $$ = $3;
  }
  ;

pair
  : STRING is value -> [$1, $3]
  ;

array
  : so elements many -> $2
  | so many -> []
  ;
elements
  : value -> [$1]
  | elements next value { $1.push($3); $$ = $1; }
  ;

number
  : NUMBER EXPONENT -> parseFloat($1+$2)
  | NUMBER -> parseFloat($1)
  ;

