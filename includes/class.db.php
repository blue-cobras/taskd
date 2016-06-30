<?php
/****
 ** MySQL Database Connection Class
 ** Author: Joshua Walcher - Email: joshuawalcher@gmail.com | Github: joshuawalcher
 ** Organization: Blue Cobras
 ** Date: June 2016
 **/
 if (!function_exists('mysqli_connect')) {
    die("Your PHP installation does not have MySQL support. Please enable MySQL support in PHP or ask your web host to do so for you.");
}
class Database
{
    /**
    * The global database connection.
    *
    * @see Connect
    *
    * @var Resource
    */
    var $connection = null;
    /**
    * Where any database errors are stored.
    *
    * @see GetError
    * @see SetError
    *
    * @access private
    *
    * @var String
    */
    var $_Error = null;
    
    /**
    * What type of error this is.
    *
    * @see GetError
    * @see SetError
    *
    * @access private
    *
    * @var String
    */
    var $_ErrorLevel = E_USER_ERROR;
    /**
    * The character to enclose fields/tables with to escape the field name
    *
    * @var String
    */
    var $EscapeChar='`';

    /**
    * The function to call whenever there is a database error. Useful for logging errors.
    *
    * @var String
    */
    var $ErrorCallback = null;
    
    /**
    * Whether a query is being automatically retried or not.
    * This is set in the Query method as a flag so we know whether to re-establish the database connection
    * This only happens when a particular error code comes back so we don't try to re-run bad queries
    *
    * @see Query
    * @see Connect
    *
    * @var Boolean
    */
    var $_retry = false;

    /**
    * Are we in the error callback function ? Used to avoid logging errors that happen inside
    * the callback function
    *
    * @var Boolean
    */
    var $_InErrorCallback = false;
    /**
    
    
    /**
    * Is magic quotes runtime on ?
    *
    * @var Boolean
    */
    var $magic_quotes_runtime_on = false;
    
    /**
    * This flag is checked when Query is called to see which mode to run the query in.
    * Calling the UnbufferedQuery function sets this flag to true, then lets the main Query function handle the rest.
    *
    * @see UnbufferedQuery
    * @see Query
    *
    * @var Boolean Defaults to false (don't run in unbuffered mode).
    */
    var $_unbuffered_query = false;
    
    /**
    * The hostname we are connected to.
    * This is needed so we can re-establish a database connection under particular circumstances
    *
    * @see Connect
    *
    * @var String
    */
    var $_hostname = '';
    
    /**
    * The username we are connected with.
    * This is needed so we can re-establish a database connection under particular circumstances
    *
    * @see Connect
    *
    * @var String
    */
    var $_username = '';
    
    /**
    * The password we are connected with.
    * This is needed so we can re-establish a database connection under particular circumstances
    *
    * @see Connect
    *
    * @var String
    */
    var $_password = '';
    
    /**
    * The database name we are connected to.
    * This is needed so we can re-establish a database connection under particular circumstances
    *
    * @see Connect
    *
    * @var String
    */
    var $_databasename = '';
   
    /**
	* Connect
	* This function will connect to the database based on the details passed in.
	*
	* @param String $hostname Name of the server to connect to.
	* @param String $username Username to connect to the server with.
	* @param String $password Password to connect with.
	* @param String $databasename Database name to connect to.
	*
	* @see SetError
	*
	* @return False|Resource Returns the resource if the connection is successful. If anything is missing or incorrect, this will return false.
    */
    public function Connect()
    {
        $hostname = GetConfig('DB_HOST');
        $username = GetConfig('DB_USER');;
        $password = GetConfig('DB_PASSWORD');;
        $databasename = GetConfig('DB_NAME');;
        if ($hostname === null && $username === null && $password === null && $databasename === null) {
                $hostname = $this->_hostname;
                $username = $this->_username;
                $password = $this->_password;
                $databasename = $this->_databasename;
        }
        
        if ($hostname == '') {
                $this->SetError('No server name to connect to');
                return false;
        }
    
        if ($username == '') {
                $this->SetError('No username name to connect to server '.$hostname.' with');
                return false;
        }
    
        if ($databasename == '') {
                $this->SetError('No database name to connect to');
                return false;
        }
    
        if ($this->_retry && is_resource($this->connection)) {
                $this->Disconnect($this->connection);
        }
    
        $connection_result = @mysqli_connect($hostname, $username, $password);
        if (!$connection_result) {
                $this->SetError(mysqli_error($connection_result));
                return false;
        }
        $this->connection = $connection_result;
    
        $db_result = @mysqli_select_db($connection_result,$databasename);
        if (!$db_result) {
                $this->SetError('Unable to select database \''.$databasename.'\': '.mysqli_error());
                return false;
        }
        $this->_hostname = $hostname;
        $this->_username = $username;
        $this->_password = $password;
        $this->_databasename = $databasename;
    
        return $this->connection;
    }
    /**
    * Disconnect
    * This function will disconnect from the database handler passed in.
    *
    * @param String $resource Resource to disconnect from
    *
    * @see SetError
    *
    * @return Boolean If the resource passed in is not valid, this will return false. Otherwise it returns the status from pg_close.
    */
    public function Disconnect($resource=null)
    {
            if ($resource === null) {
                    $this->SetError('Resource is a null object');
                    return false;
            }
            if (!is_resource($resource)) {
                    $this->SetError('Resource '.$resource.' is not really a resource');
                    return false;
            }
            $close_success = mysqli_close($resource);
            if ($close_success) {
                    $this->connection = null;
            }
            return $close_success;
    }
    /**
    * Query
    * This function will run a query against the database and return the result of the query.
    *
    * @param String $query The query to run.
    *
    * @see LogQuery
    * @see SetError
    *
    * @return Mixed Returns false if the query is empty or if there is no result. Otherwise returns the result of the query.
    */
    public function Query($query='')
    {
        // if we're retrying a query, we have to kill the old connection and grab it again.
        // if we don't, we get a cached connection which won't work.
        if ($this->_retry) {
                $this->Connect();
        }
        
        // Trim query
        $query = trim($query);
        
        if (!$query) {
                $this->_retry = false;
                $this->SetError('Query passed in is empty');
                return false;
        }
        
        if (!$this->connection) {
                $this->_retry = false;
                $this->SetError('No valid connection');
                return false;
        }
        
              
        if ($this->TimeLog !== null || $this->StoreQueryList ==  true) {
                $timestart = $this->GetTime();
        }
        
        $result = mysqli_query($this->connection, $query);
        
        if (!$result) {
            $error = mysqli_error($this->connection);
            $errno = mysqli_errno($this->connection);
            
            if ($this->ErrorLog !== null) {
                $this->LogError($query, $error);
            }
            
            $this->SetError($error, E_USER_ERROR, $query);
            
            // we've already retried? don't try again.
            // or if the error is not '2006', then don't bother going any further.
            if ($this->_retry || $errno !== 2006) {
                $this->_retry = false;
                return false;
            }
            
            // error 2006 is 'server has gone away'
            // http://dev.mysql.com/doc/refman/5.0/en/error-messages-client.html
            if ($errno === 2006) {
                $this->_retry = true;
                return $this->Query($query);
            }
        }
        
        // make sure we set the 'retry' flag back to false if we are returning a result set.
        $this->_retry = false;
        return $result;
    }
    /**
    * NextId
    * Fetches the next id from the sequence passed in
    *
    * @param String $sequencename Sequence Name to fetch the next id for.
    * @param String $idcolumn The name of the column for the id field. By default this is 'id'.
    *
    * @see Query
    *
    * @return Mixed Returns false if there is no sequence name or if it can't fetch the next id. Otherwise returns the next id
    */
    public function NextId($sequencename=false, $idcolumn='id')
    {
            if (!$sequencename) {
                    return false;
            }
            $query = 'UPDATE '.$sequencename.' SET ' . $idcolumn . '=LAST_INSERT_ID(' . $idcolumn . '+1)';
            $result = $this->Query($query);
            if (!$result) {
                    return false;
            }
            return mysqli_insert_id($this->connection);
    }
    
    /**
    * AddLimit
    * This function creates the SQL to add a limit clause to an sql statement.
    *
    * @param Int $offset Where to start fetching the results
    * @param Int $numtofetch Number of results to fetch
    *
    * @return String The string to add to the end of the sql statement
    */
    public function AddLimit($offset=0, $numtofetch=0)
    {
        $offset = intval($offset);
        $numtofetch = intval($numtofetch);
    
        if ($offset < 0) {
                $offset = 0;
        }
        if ($numtofetch <= 0) {
                $numtofetch = 10;
        }
        $query = ' LIMIT '.$offset.', '.$numtofetch;
        return $query;
    }
    
    /**
    * CountResult
    * Returns the number of rows returned for the resource passed in
    *
    * @param String $resource The result from calling Query
    *
    * @see Query
    * @see SetError
    *
    * @return Int Number of rows from the result
    * Note: Select COUNT(*) is faster!
    */
    public function CountResult($resource=null)
    {
            if ($resource === null) {
                    $this->SetError('Resource is a null object');
                    return false;
            }
            if (!is_resource($resource)) {
                    $resource = $this->Query($resource);
            }
            $count = mysqli_num_rows($resource);
            return $count;
    }
    
    /**
    * Quote
    * Quotes the string ready for database queries. Runs mysqli_real_escape_string.
    *
    * @param Mixed $var Variable you want to quote ready for database entry.
    *
    * @return Mixed $var with quotes applied to it appropriately
    */
    public function Quote($var='')
    {
            if (is_string($var) || is_numeric($var) || is_null($var)) {
                    return @mysqli_real_escape_string($this->connection,$var);
            } else if (is_array($var)) {
                    return array_map(array($this, 'Quote'), $var);
            } else if (is_bool($var)) {
                    return (int) $var;
            } else {
                    trigger_error("Invalid type passed to DB quote ".gettype($var), E_USER_ERROR);
                    return false;
            }
    }

    /**
    * LastId
    *
    * Returns the last insert id
    *
    * @return Int Returns mysqli_insert_id from the database.
    */
    public function LastId($seq='')
    {
            return mysqli_insert_id($this->connection);
    }

    /**
    * FetchOne
    * Fetches one item from a result and returns it.
    *
    * @param String $result Result to fetch the item from.
    * @param String $item The item to look for and return.
    *
    * @see Fetch
    *
    * @return Mixed Returns false if there is no result or item, or if the item doesn't exist in the result. Otherwise returns the item's value.
    */
    public function FetchOne($result=null, $item=null)
    {
            if ($result === null) {
                    return false;
            }
            if (!is_resource($result)) {
                    $result = $this->Query($result);
            }
            $row = $this->Fetch($result);
            if (!$row) {
                    return false;
            }
            if ($item === null) {
                    $item = key($row);
            }
            if (!isset($row[$item])) {
                    return false;
            }
            return $row[$item];
    }
    
    /**
    * SetError
    *
    * Stores the error in the _error var for retrieval. This function will also call the error callback if there is one specified.
    *
    * @param String $error The error you wish to store for retrieval.
    * @param String $errorlevel The error level you wish to store.
    * @param String $query (Optional) The query that was executed that caused the error if there is one.
    *
    * @return Void Doesn't return anything, only sets the values and leaves it at that.
    */
    function SetError($error='', $errorlevel=E_USER_ERROR, $query='')
    {
            $this->_Error = $error;
            $this->_ErrorLevel = $errorlevel;

            $callback_valid = false;
            if (is_string($this->ErrorCallback)) {
                    $callback_valid = function_exists($this->ErrorCallback);
            } elseif (is_array($this->ErrorCallback)) {
                    $callback_valid = method_exists($this->ErrorCallback[0], $this->ErrorCallback[1]);
            }
            if ($this->ErrorCallback !== null && $callback_valid && !$this->_InErrorCallback) {
                    $this->_InErrorCallback = true;
                    call_user_func($this->ErrorCallback, $error, $query);
                    $this->_InErrorCallback = false;
            }
    }

    /**
    * GetError
    *
    * This simply returns the $_Error var and it's error level.
    *
    * @see SetError
    *
    * @return Array Returns the error and it's error level.
    */
    function GetError()
    {
            return array($this->_Error, $this->_ErrorLevel);
    }

    /**
    * Error
    *
    * This returns just the error message from the database.
    *
    * @see SetError
    * @see _Error
    *
    * @return String Returns just the error message from SetError.
    */
    function Error()
    {
            return $this->_Error;
    }

    /**
    * GetErrorMsg
    *
    * This simply returns the $_Error var
    *
    * @access public
    *
    * @see SetError
    *
    * @return String Returns the error
    */
    function GetErrorMsg()
    {
            return $this->_Error;
    }
}
