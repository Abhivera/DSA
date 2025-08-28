# SQL Crash Course - Complete Revision Guide

## 1. Basic SQL Structure

```sql
SELECT column1, column2
FROM table_name
WHERE condition
ORDER BY column1;
```

## 2. Data Retrieval (SELECT)

### Basic SELECT
```sql
-- Select all columns
SELECT * FROM employees;

-- Select specific columns
SELECT first_name, last_name, salary FROM employees;

-- Select with aliases
SELECT first_name AS "First Name", salary AS "Annual Salary" FROM employees;
```

### DISTINCT
```sql
-- Remove duplicates
SELECT DISTINCT department FROM employees;
```

## 3. Filtering Data (WHERE)

### Basic Conditions
```sql
SELECT * FROM employees WHERE salary > 50000;
SELECT * FROM employees WHERE department = 'IT';
SELECT * FROM employees WHERE hire_date >= '2020-01-01';
```

### Logical Operators
```sql
-- AND, OR, NOT
SELECT * FROM employees WHERE salary > 50000 AND department = 'IT';
SELECT * FROM employees WHERE department = 'IT' OR department = 'HR';
SELECT * FROM employees WHERE NOT department = 'Finance';
```

### Comparison Operators
```sql
-- BETWEEN
SELECT * FROM employees WHERE salary BETWEEN 40000 AND 80000;

-- IN
SELECT * FROM employees WHERE department IN ('IT', 'HR', 'Finance');

-- LIKE (Pattern Matching)
SELECT * FROM employees WHERE first_name LIKE 'J%';     -- Starts with J
SELECT * FROM employees WHERE first_name LIKE '%son';   -- Ends with son
SELECT * FROM employees WHERE first_name LIKE '_ohn';   -- Second letter is o

-- IS NULL / IS NOT NULL
SELECT * FROM employees WHERE phone IS NULL;
SELECT * FROM employees WHERE phone IS NOT NULL;
```

## 4. Sorting Data (ORDER BY)

```sql
-- Ascending (default)
SELECT * FROM employees ORDER BY salary;

-- Descending
SELECT * FROM employees ORDER BY salary DESC;

-- Multiple columns
SELECT * FROM employees ORDER BY department, salary DESC;
```

## 5. Limiting Results

```sql
-- MySQL/PostgreSQL
SELECT * FROM employees LIMIT 10;

-- SQL Server
SELECT TOP 10 * FROM employees;

-- Oracle
SELECT * FROM employees WHERE ROWNUM <= 10;
```

## 6. Aggregate Functions

```sql
SELECT COUNT(*) FROM employees;                    -- Count rows
SELECT COUNT(DISTINCT department) FROM employees;  -- Count unique values
SELECT AVG(salary) FROM employees;                 -- Average
SELECT SUM(salary) FROM employees;                 -- Sum
SELECT MIN(salary), MAX(salary) FROM employees;    -- Min and Max
```

## 7. Grouping Data (GROUP BY)

```sql
-- Basic grouping
SELECT department, COUNT(*) 
FROM employees 
GROUP BY department;

-- Multiple columns
SELECT department, job_title, AVG(salary)
FROM employees
GROUP BY department, job_title;

-- HAVING (filter groups)
SELECT department, AVG(salary)
FROM employees
GROUP BY department
HAVING AVG(salary) > 60000;
```

## 8. Joins

### Sample Tables
```sql
-- employees table: id, first_name, last_name, department_id, salary
-- departments table: id, name, location
```

### INNER JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;
```

### LEFT JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id;
```

### RIGHT JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;
```

### FULL OUTER JOIN
```sql
SELECT e.first_name, e.last_name, d.name AS department
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;
```

### Self Join
```sql
SELECT e1.first_name AS employee, e2.first_name AS manager
FROM employees e1
LEFT JOIN employees e2 ON e1.manager_id = e2.id;
```

## 9. Subqueries

### Single Value Subquery
```sql
SELECT * FROM employees 
WHERE salary > (SELECT AVG(salary) FROM employees);
```

### Multiple Value Subquery
```sql
SELECT * FROM employees 
WHERE department_id IN (SELECT id FROM departments WHERE location = 'New York');
```

### Correlated Subquery
```sql
SELECT e1.* FROM employees e1
WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);
```

### EXISTS
```sql
SELECT * FROM departments d
WHERE EXISTS (SELECT 1 FROM employees e WHERE e.department_id = d.id);
```

## 10. Data Manipulation

### INSERT
```sql
-- Single row
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES ('John', 'Doe', 55000, 1);

-- Multiple rows
INSERT INTO employees (first_name, last_name, salary, department_id)
VALUES 
    ('Jane', 'Smith', 60000, 2),
    ('Bob', 'Johnson', 52000, 1);

-- From another table
INSERT INTO employees_backup 
SELECT * FROM employees WHERE hire_date < '2020-01-01';
```

### UPDATE
```sql
-- Single column
UPDATE employees SET salary = 65000 WHERE id = 1;

-- Multiple columns
UPDATE employees 
SET salary = salary * 1.1, last_updated = CURRENT_DATE
WHERE department_id = 1;

-- With JOIN
UPDATE employees e
SET salary = salary * 1.05
FROM departments d
WHERE e.department_id = d.id AND d.name = 'IT';
```

### DELETE
```sql
-- With condition
DELETE FROM employees WHERE id = 1;

-- Multiple conditions
DELETE FROM employees WHERE salary < 30000 AND hire_date < '2019-01-01';

-- All rows (be careful!)
DELETE FROM employees;
```

## 11. Table Operations (DDL)

### CREATE TABLE
```sql
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2),
    hire_date DATE DEFAULT CURRENT_DATE,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

### ALTER TABLE
```sql
-- Add column
ALTER TABLE employees ADD COLUMN phone VARCHAR(15);

-- Modify column
ALTER TABLE employees MODIFY COLUMN salary DECIMAL(12,2);

-- Drop column
ALTER TABLE employees DROP COLUMN phone;

-- Add constraint
ALTER TABLE employees ADD CONSTRAINT fk_dept 
FOREIGN KEY (department_id) REFERENCES departments(id);
```

### DROP TABLE
```sql
DROP TABLE employees;
```

## 12. Common Functions

### String Functions
```sql
SELECT 
    UPPER(first_name) AS upper_name,
    LOWER(last_name) AS lower_name,
    CONCAT(first_name, ' ', last_name) AS full_name,
    LENGTH(first_name) AS name_length,
    SUBSTRING(first_name, 1, 3) AS first_three_chars
FROM employees;
```

### Date Functions
```sql
SELECT 
    CURRENT_DATE,
    CURRENT_TIME,
    NOW(),
    YEAR(hire_date) AS hire_year,
    MONTH(hire_date) AS hire_month,
    DATEDIFF(CURRENT_DATE, hire_date) AS days_employed
FROM employees;
```

### Numeric Functions
```sql
SELECT 
    ROUND(salary/12, 2) AS monthly_salary,
    CEIL(salary/1000) AS salary_thousands_rounded_up,
    FLOOR(salary/1000) AS salary_thousands_rounded_down,
    ABS(-1000) AS absolute_value
FROM employees;
```

## 13. Conditional Logic

### CASE Statement
```sql
SELECT 
    first_name,
    last_name,
    salary,
    CASE 
        WHEN salary >= 80000 THEN 'High'
        WHEN salary >= 50000 THEN 'Medium'
        ELSE 'Low'
    END AS salary_category
FROM employees;
```

### IF/IIF (MySQL/SQL Server)
```sql
-- MySQL
SELECT first_name, IF(salary > 60000, 'High Earner', 'Regular') AS category
FROM employees;

-- SQL Server
SELECT first_name, IIF(salary > 60000, 'High Earner', 'Regular') AS category
FROM employees;
```

## 14. Window Functions

```sql
-- ROW_NUMBER
SELECT 
    first_name, 
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS salary_rank
FROM employees;

-- RANK and DENSE_RANK
SELECT 
    first_name, 
    salary,
    RANK() OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- Partition by department
SELECT 
    first_name, 
    department_id,
    salary,
    AVG(salary) OVER (PARTITION BY department_id) AS dept_avg_salary
FROM employees;

-- Running totals
SELECT 
    first_name, 
    salary,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees;
```

## 15. Indexes and Performance

### Create Index
```sql
CREATE INDEX idx_employee_salary ON employees(salary);
CREATE INDEX idx_employee_dept_salary ON employees(department_id, salary);
```

### Query Optimization Tips
- Use indexes on frequently queried columns
- Avoid SELECT * in production
- Use LIMIT/TOP to restrict results
- Use EXISTS instead of IN for subqueries when possible
- Use appropriate JOIN types

## 16. Constraints

```sql
CREATE TABLE employees (
    id INT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    salary DECIMAL(10,2) CHECK (salary > 0),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
```

## 17. Common Patterns

### Find Duplicates
```sql
SELECT email, COUNT(*)
FROM employees
GROUP BY email
HAVING COUNT(*) > 1;
```

### Delete Duplicates (Keep One)
```sql
DELETE e1 FROM employees e1
INNER JOIN employees e2
WHERE e1.id > e2.id AND e1.email = e2.email;
```

### Top N per Group
```sql
SELECT * FROM (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) as rn
    FROM employees
) ranked
WHERE rn <= 3;
```

### Pivot Data (Basic)
```sql
SELECT 
    SUM(CASE WHEN department = 'IT' THEN salary ELSE 0 END) AS IT_total,
    SUM(CASE WHEN department = 'HR' THEN salary ELSE 0 END) AS HR_total,
    SUM(CASE WHEN department = 'Finance' THEN salary ELSE 0 END) AS Finance_total
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

## Quick Reference - SQL Order of Execution

1. **FROM** - Choose tables
2. **WHERE** - Filter rows
3. **GROUP BY** - Group rows
4. **HAVING** - Filter groups
5. **SELECT** - Choose columns
6. **ORDER BY** - Sort results
7. **LIMIT/TOP** - Limit results

## Practice Questions to Try

1. Find employees earning more than the average salary
2. Get the second highest salary in each department
3. Find departments with no employees
4. Calculate running totals of salaries by hire date
5. Find employees who earn more than their manager
6. Get monthly hiring trends (count of employees hired per month)
7. Find the longest gap between consecutive hire dates
8. Identify employees whose salary is above the 75th percentile

Remember: Practice with real databases and always test your queries on sample data first!